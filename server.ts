import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory cache for generated TTS audio to reduce latency & quota usage
const ttsCache = new Map<string, string>();

// TTS API endpoint using gemini-3.8-flash-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice = 'Kore', speed = 1.0 } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const trimmedText = text.trim();
    const cacheKey = `${trimmedText}_${voice}`;

    if (ttsCache.has(cacheKey)) {
      return res.json({
        audioBase64: ttsCache.get(cacheKey),
        mimeType: 'audio/wav',
        cached: true,
      });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY not configured. Falling back to browser speech synthesis.',
        fallback: true,
      });
    }

    // Call Gemini 3.8 Flash TTS model
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: trimmedText,
              speechMetadata: {
                style: 'Eloquent, clear Arabic reading instructor for children with crisp tashkeel, soothing and motivating tone.',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice, // 'Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'
            },
          },
        },
      },
    });

    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      return res.status(500).json({
        error: 'No audio returned from Gemini TTS',
        fallback: true,
      });
    }

    // Cache to prevent re-calling for common letters/words
    if (ttsCache.size < 500) {
      ttsCache.set(cacheKey, audioBase64);
    }

    res.json({
      audioBase64,
      mimeType: 'audio/wav',
      cached: false,
    });
  } catch (error: any) {
    console.error('Error generating TTS with gemini-3.8-flash-tts:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate speech with Gemini',
      fallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiTTSAvailable: !!ai,
    appName: 'أقرأها صح',
    director: 'المهندس شوقي حسن الجعور',
  });
});

// Start dev server with Vite middlewares
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 'أقرأها صح' Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
