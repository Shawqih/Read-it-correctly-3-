# تطبيق «أَقْرَأُهَا صَحّْ» | Aqraha Sah

> **المبادرة المجتمعية التعليمية الرائدة لتمكين تلاميذ المرحلة الابتدائية من إتقان القراءة والكتابة والنطق الفصيح**  
> **بإشراف وتوجيه: المهندس شوقي حسن الجعور**

[![Android](https://img.shields.io/badge/Platform-Android%208.0%2B%20(API%2026--34)-3DDC84?logo=android&logoColor=white)](https://developer.android.com/)
[![Kotlin](https://img.shields.io/badge/Kotlin-1.9%2B-7F52FF?logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![Jetpack Compose](https://img.shields.io/badge/UI-Jetpack%20Compose%20%26%20M3-4285F4?logo=jetpackcompose&logoColor=white)](https://developer.android.com/jetpack/compose)
[![Clean Architecture](https://img.shields.io/badge/Pattern-MVVM%20%2B%20Clean%20Architecture-blue)](https://developer.android.com/topic/architecture)
[![Gemini TTS](https://img.shields.io/badge/AI%20Voice-Gemini%203.8%20Flash%20TTS-FF6F00?logo=google&logoColor=white)](https://ai.google.dev/)
[![Offline First](https://img.shields.io/badge/Offline-100%25%20Supported-success)](https://developer.android.com/training/data-storage/room)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 نظرة عامة حول التطبيق

صُمم تطبيق **أقرأها صح** ليكون المعين الأمثل لتلاميذ المرحلة الابتدائية من **الصف الأول حتى الصف السادس** لإتقان مخارج الحروف، التشكيل السليم، الطلاقة في القراءة، والتهجئة، ويعمل التطبيق بكفاءة متناهية **دون الحاجة إلى اتصال بالإنترنت (Offline-First)** مع ميزة النطق السحابي الفصيح المدعوم بنموذج الذكاء الاصطناعي `gemini-3.8-flash-tts`.

---

## ✨ المميزات الرئيسية للمشروع

1. **ركن الحروف الهجائية التفاعلي**:
   - لوحة رسم وتتبع تفاعلية لكتابة الحروف بالأصابع أو الفأرة بألوان وأحجام متنوعة.
   - نطق صوتي فصيح لكل حرف بالحركات الثلاث (الفتحة، الضمة، الكسرة) والسكون.
   - أمثلة مصورة وكلمات دالة ونموذجية لكل حرف.

2. **المناهج والوحدات الدراسية (الصفوف 1-6)**:
   - أكثر من 30 درساً ونشاطاً فرعياً شاملاً (قراءة إجهادية، تهجئة صوتية، تمييز المدود والتاءات، تحليل صوتي).
   - مؤشرات إنجاز بصرية تشجع الطفل على مواصلة التعلم.

3. **الاختبارات التقييمية الذكية**:
   - قراءة صوتية للأسئلة والخيارات لمساعدة المتعلم الصغير.
   - عند تحقيق الدرجة الكاملة 100%، يُمنح التلميذ وساماً تشجيعياً خاصاً وتُطلق احتفالية مبهجة تعزز ثقته بنفسه.

4. **أكبر مكتبة قصصية للأطفال (300 قصة مشكولة)**:
   - 50 قصة هادفة مخصصة لكل صف دراسي.
   - مزودة بنطق صوتي متقن، تكبير الخط للقراءة المريحة، أسئلة فهم استيعابي، وتحديد القيم الأخلاقية.

5. **الألعاب اللغوية التفاعلية**:
   - لعبة الذاكرة اللغوية لمطابقة الحروف والكلمات.
   - لعبة مطابقة الحركات الصوتية.
   - منجم تكوين وترتيب الجمل الفصيحة.

6. **مختبر النطق الصوتي ومخارج الحروف**:
   - استماع للنطق النموذجي الفصيح.
   - تسجيل صوت التلميذ مع مخطط أمواج صوتية متحرك في الوقت الفعلي.
   - مقارنة التسجيل مع صوت المعلم وتقييم الذات.

7. **لوحة متابعة ولي الأمر والمعلم**:
   - تقارير دقيقة عن عدد النجوم، الأوسمة، والدروس المكتملة.
   - حفظ أو تصفير التقدم.
   - توليد وطباعة شهادة تميز وإتقان معتمدة.

8. **تصدير وبناء APK حقيقي لأندرويد**:
   - هيكلة كود Kotlin كاملة بـ Clean Architecture + MVVM.
   - ملفات Gradle و GitHub Actions CI/CD جاهزة لتصدير ملف `.apk`.

---

## 📱 معمارية تطبيق أندرويد (Clean Architecture + MVVM)

```
app/
├── data/              # طبقة البيانات
│   ├── local/         # Room Database (AqrahaDatabase, LetterDao, StoryDao)
│   ├── remote/        # Retrofit Services & Gemini TTS API
│   ├── preferences/   # EncryptedSharedPreferences (أمان البيانات)
│   └── repository/    # تنفيذ المستودعات (AqrahaRepositoryImpl)
├── domain/            # منطق الأعمال والمجال
│   ├── model/         # كيانات المجال (AlphabetLetter, Lesson, Story)
│   ├── repository/    # واجهات المستودعات (AqrahaRepository)
│   └── usecase/       # حالات الاستخدام (GetLettersUseCase, CompleteLessonUseCase)
├── presentation/      # طبقة العرض والواجهات
│   ├── ui/            # شاشات ومكونات Jetpack Compose (دعم RTL كامل)
│   │   ├── alphabet/
│   │   ├── curriculum/
│   │   ├── stories/
│   │   └── lab/
│   └── viewmodel/     # StateFlow & Hilt ViewModels
├── di/                # حقن التبعيات (Hilt Modules)
└── utils/             # فئات الأخطاء (Resource Sealed Class) والمساعدات
```

---

## 🚀 متطلبات التشغيل والتثبيت

### لتشغيل تطبيق الويب / PWA:
```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل خادم التطوير
npm run dev

# افتح المتصفح على: http://localhost:3000
```

### لبناء تطبيق أندرويد (APK):
```bash
# بناء نسخة التجربة Debug
./gradlew assembleDebug

# بناء نسخة الإصدار Release APK
./gradlew assembleRelease

# مسار ملف APK النهائي:
app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 🛠️ أوامر Git الموصى بها

```bash
git init
git add .
git commit -m "Initial commit: أقرأها صح - Android Professional App"
git branch -M main
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git
git push -u origin main
```

---

## 👨‍💼 الإشراف والتطوير

- **المشرف العام والمطور الرئيسي:** المهندس شوقي حسن الجعور (Eng. Shawki Hassan Al-Jaour)
- **البريد الإلكتروني:** hshawki26@gmail.com
- **الترخيص:** مرخص بموجب رخصة [MIT License](LICENSE).
