// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM or set display:none after fade out
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1200); // Duration of drawing animation + slight pause
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. THEME TOGGLING --- */
    const themeBtn = document.getElementById('theme-toggle');

    // Ultra Modern SVG Icons (Reference Match - Solid White)
    const iconSun = `<svg viewBox="0 0 24 24" fill="none" class="icon-sun">
        <defs><linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs>
        <circle cx="12" cy="12" r="6" fill="url(#sunGrad)" stroke="white" stroke-width="1.5"/>
        <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    const iconMoon = `<svg viewBox="0 0 24 24" fill="none" class="icon-moon">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#6366f1" stroke="white" stroke-width="1.5">
           <animate attributeName="fill" values="#6366f1;#4f46e5;#6366f1" dur="3s" repeatCount="indefinite"/>
        </path>
    </svg>`;

    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Re-draw canvas if it exists
            if (typeof initCanvasBackground === 'function') {
                setTimeout(() => initCanvasBackground(), 50);
            }
        });
    }

    function updateThemeIcon(theme) {
        if (themeBtn) {
            themeBtn.innerHTML = theme === 'light' ? iconSun : iconMoon;
            themeBtn.title = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        }
    }


    /* --- 2. LANGUAGE TOGGLING (Text Indicator) --- */
    const langBtn = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'en';

    setLanguage(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const lang = document.documentElement.getAttribute('lang');
            const newLang = lang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        if (langBtn) {
            // Text-Based Indicator (Solid White matches Blue Gradient Pill)
            if (lang === 'en') {
                langBtn.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:#f1f5f9; letter-spacing:0.5px;">EN</span>`;
                langBtn.style.fontFamily = "'Segoe UI', sans-serif";
            } else {
                langBtn.innerHTML = `<span style="font-weight:900; font-size:1.2rem; color:#f1f5f9;">ع</span>`;
                langBtn.style.fontFamily = "'Amiri', serif";
            }
            langBtn.title = lang === 'en' ? 'Switch to Arabic' : 'Switch to English';
        }

        // Update Direction
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update Text Content (UI Shell)
        updateUIText(lang);
    }

    function updateUIText(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    /* --- 3. MOBILE MENU --- */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navList = document.getElementById('nav-list');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }

    /* --- 4. CANVAS BACKGROUND --- */
    initCanvasBackground();


    /* --- 5. QUIZ LOGIC (Only runs if on quiz page) --- */
    if (document.getElementById('quiz-container')) {
        initQuiz();
    }
});

/* --- TRANSLATIONS (Shell Only - Content is handled via CSS classes) --- */
const translations = {
    en: {
        'nav-home': 'Home',
        'nav-lessons': 'Lessons',
        'nav-examples': 'Examples',
        'nav-quiz': 'Quiz',
        'nav-report': 'Report',
        'footer-vision': 'Our Strategic Vision',
        'footer-contact': 'Contact Us',
        'footer-quick-links': 'Quick Links',
        'btn-start': 'Start Learning Now',
        'welcome': 'Master Modern PHP Development',
        'header-subtitle': 'The most comprehensive resource for learning server-side programming. Interactive lessons, real-world examples, and instant feedback quizzes.',
        'label-email': 'Email',
        'label-phone': 'Phone',
        'label-location': 'Location',
        'footer-copyright': '© 2025 Ahmed Adel. All rights reserved.'
    },
    ar: {
        'nav-home': 'الرئيسية',
        'nav-lessons': 'الدروس',
        'nav-examples': 'أمثلة',
        'nav-quiz': 'اختبار',
        'nav-report': 'التقرير',
        'footer-vision': 'رؤيتنا الاستراتيجية',
        'footer-contact': 'اتصل بنا',
        'footer-quick-links': 'روابط سريعة',
        'btn-start': 'ابدأ التعلم الآن',
        'welcome': 'احترف برمجة PHP الحديثة',
        'header-subtitle': 'المصدر الشامل لتعلم برمجة جانب الخادم. دروس تفاعلية، أمثلة واقعية، واختبارات فورية.',
        'label-email': 'البريد الإلكتروني',
        'label-phone': 'الهاتف',
        'label-location': 'الموقع',
        'footer-copyright': '© 2025 أحمد عادل. جميع الحقوق محفوظة.'
    }
};

/* --- CANVAS ANIMATION --- */
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Resize
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particles
    const particles = [];
    const particleCount = 40;
    const symbols = ['<?php', '?>', '$', '{', '}', ';', 'echo', 'if', 'array'];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = (Math.random() * 1) + 0.2;
            this.text = symbols[Math.floor(Math.random() * symbols.length)];
            this.size = Math.random() * 15 + 10;
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.y -= this.speed;
            if (this.y < -50) this.reset();
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark
                ? `rgba(139, 92, 246, ${this.opacity})` // Violet
                : `rgba(59, 130, 246, ${this.opacity})`; // Blue

            ctx.font = `${this.size}px monospace`;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* --- QUIZ LOGIC --- */

// Full Question Database (Categorized - 5 Questions Each)
const quizData = [
    // INPUT: $_GET
    {
        id: 'quiz-get',
        questions: [
            {
                en: { q: "Information sent via GET method is visible in...", options: ["HTTP Header", "URL Address Bar", "Server Logs only"], a: 1 },
                ar: { q: "المعلومات المرسلة عبر طريقة GET تظهر في...", options: ["ترويسة HTTP", "شريط عنوان URL", "سجلات السيرفر فقط"], a: 1 }
            },
            {
                en: { q: "What is the typical character limit for GET requests?", options: ["2000 characters", "Unlimited", "256 MB"], a: 0 },
                ar: { q: "ما هو الحد النمطي لعدد الحروف في طلبات GET؟", options: ["2000 حرف", "غير محدود", "256 ميجابايت"], a: 0 }
            },
            {
                en: { q: "GET requests should NEVER be used for:", options: ["Search queries", "Pagination", "Passwords"], a: 2 },
                ar: { q: "يجب ألا تستخدم طلبات GET أبداً لـ:", options: ["استعلامات البحث", "تقسيم الصفحات", "كلمات المرور"], a: 2 }
            },
            {
                en: { q: "Can GET requests be bookmarked?", options: ["Yes", "No", "Only in Chrome"], a: 0 },
                ar: { q: "هل يمكن حفظ طلبات GET في المفضلة؟", options: ["نعم", "لا", "فقط في كروم"], a: 0 }
            },
            {
                en: { q: "Which global variable retrieves GET data?", options: ["$GET", "$_GET", "$REQUEST_GET"], a: 1 },
                ar: { q: "ما هو المتغير العام لجلب بيانات GET؟", options: ["$GET", "$_GET", "$REQUEST_GET"], a: 1 }
            }
        ]
    },
    // INPUT: $_POST
    {
        id: 'quiz-post',
        questions: [
            {
                en: { q: "Where is POST data sent?", options: ["URL Parameters", "HTTP Message Body", "Browser Cookies"], a: 1 },
                ar: { q: "أين يتم إرسال بيانات POST؟", options: ["معاملات الرابط", "جسم رسالة HTTP", "ملفات تعريف الارتباط"], a: 1 }
            },
            {
                en: { q: "Which method is safer for sensitive data?", options: ["GET", "POST", "Both are equal"], a: 1 },
                ar: { q: "أي طريقة أكثر أماناً للبيانات الحساسة؟", options: ["GET", "POST", "كلاهما متساويان"], a: 1 }
            },
            {
                en: { q: "Does POST have a standard size limit?", options: ["2KB", "No standard limit (Server defined)", "10MB"], a: 1 },
                ar: { q: "هل يوجد حد قياسي لحجم POST؟", options: ["2 كيلوبايت", "لا حد قياسي (يحدده السيرفر)", "10 ميجابايت"], a: 1 }
            },
            {
                en: { q: "How do you access POST data?", options: ["$_POST['name']", "$_GET['name']", "$post['name']"], a: 0 },
                ar: { q: "كيف تصل لبيانات POST؟", options: ["$_POST['name']", "$_GET['name']", "$post['name']"], a: 0 }
            },
            {
                en: { q: "Can you upload files using POST?", options: ["Yes, with multipart/form-data", "No, use FTP", "Only text files"], a: 0 },
                ar: { q: "هل يمكنك رفع الملفات باستخدام POST؟", options: ["نعم، باستخدام multipart/form-data", "لا، استخدم FTP", "الملفات النصية فقط"], a: 0 }
            }
        ]
    },
    // OPERATORS: Arithmetic
    {
        id: 'quiz-arithmetic',
        questions: [
            {
                en: { q: "Result of: 10 % 3", options: ["3.33", "1", "3"], a: 1 },
                ar: { q: "نتيجة: 10 % 3", options: ["3.33", "1", "3"], a: 1 }
            },
            {
                en: { q: "Which operator is for exponentiation (power)?", options: ["^", "**", "exp"], a: 1 },
                ar: { q: "أي معامل يستخدم للأسس (القوى)؟", options: ["^", "**", "exp"], a: 1 }
            },
            {
                en: { q: "What does $x++ do?", options: ["Adds 1 and returns old value", "Adds 1 and returns new value", "Adds 2"], a: 0 },
                ar: { q: "ماذا تفعل $x++؟", options: ["تضيف 1 وترجع القيمة القديمة", "تضيف 1 وترجع القيمة الجديدة", "تضيف 2"], a: 0 }
            },
            {
                en: { q: "PHP follows standard mathematical precedence (PEMDAS)?", options: ["True", "False", "Only for brackets"], a: 0 },
                ar: { q: "هل تتبع PHP أولويات العمليات الحسابية القياسية؟", options: ["صح", "خطأ", "فقط للأقواس"], a: 0 }
            },
            {
                en: { q: "Result of: 5 + 2 * 3", options: ["21", "11", "10"], a: 1 },
                ar: { q: "نتيجة: 5 + 2 * 3", options: ["21", "11", "10"], a: 1 }
            }
        ]
    },
    // OPERATORS: Comparison
    {
        id: 'quiz-comparison',
        questions: [
            {
                en: { q: "What does === check?", options: ["Value only", "Type only", "Value and Type"], a: 2 },
                ar: { q: "عن ماذا يتحقق ===؟", options: ["القيمة فقط", "النوع فقط", "القيمة والنوع"], a: 2 }
            },
            {
                en: { q: "5 == '5' is:", options: ["True", "False", "Error"], a: 0 },
                ar: { q: "5 == '5' تكون:", options: ["صحيحة", "خاطئة", "خطأ برمجي"], a: 0 }
            },
            {
                en: { q: "Which symbol means 'Not Equal'?", options: ["<>", "!=", "Both"], a: 2 },
                ar: { q: "أي رمز يعني 'لا يساوي'؟", options: ["<>", "!=", "كلاهما"], a: 2 }
            },
            {
                en: { q: "Result of: 10 > 5", options: ["True", "False", "Null"], a: 0 },
                ar: { q: "نتيجة: 10 > 5", options: ["صحيحة", "خاطئة", "Null"], a: 0 }
            },
            {
                en: { q: "The 'Spaceship' operator <=> returns:", options: ["True/False", "-1, 0, or 1", "String"], a: 1 },
                ar: { q: "معامل السفينة <=> يرجع:", options: ["True/False", "-1, 0, أو 1", "نص"], a: 1 }
            }
        ]
    },
    // CONDITIONS: If
    {
        id: 'quiz-if',
        questions: [
            {
                en: { q: "Which block runs if expression is false?", options: ["then", "else", "stop"], a: 1 },
                ar: { q: "أي كتلة تعمل إذا كان الشرط خاطئاً؟", options: ["then", "else", "stop"], a: 1 }
            },
            {
                en: { q: "Can you nest 'if' statements?", options: ["Yes", "No", "Only 2 levels"], a: 0 },
                ar: { q: "هل يمكنك تداخل جمل 'if'؟", options: ["نعم", "لا", "مستويين فقط"], a: 0 }
            },
            {
                en: { q: "Keyword for checking a second condition:", options: ["secondif", "else if", "elseif"], a: 2 },
                ar: { q: "الكلمة المفتاحية لفحص شرط ثانٍ:", options: ["secondif", "else if", "elseif"], a: 2 }
            },
            {
                en: { q: "Correct syntax:", options: ["if (x > y)", "if x > y then", "if {x > y}"], a: 0 },
                ar: { q: "الصيغة الصحيحة:", options: ["if (x > y)", "if x > y then", "if {x > y}"], a: 0 }
            },
            {
                en: { q: "Is short-hand if (Ternary) supported?", options: ["Yes (condition ? true : false)", "No", "Maybe"], a: 0 },
                ar: { q: "هل المختصر الشرطي (Ternary) مدعوم؟", options: ["نعم (condition ? true : false)", "لا", "ربما"], a: 0 }
            }
        ]
    },
    // CONDITIONS: Switch
    {
        id: 'quiz-switch',
        questions: [
            {
                en: { q: "Used to stop falling through cases:", options: ["stop", "return", "break"], a: 2 },
                ar: { q: "يستخدم لمنع السقوط للحالات التالية:", options: ["stop", "return", "break"], a: 2 }
            },
            {
                en: { q: "The 'catch-all' case is called:", options: ["else", "default", "catch"], a: 1 },
                ar: { q: "الحالة 'الجامعة' أو الاحتياطية تسمى:", options: ["else", "default", "catch"], a: 1 }
            },
            {
                en: { q: "Switch compares using:", options: ["Loose equality (==)", "Strict equality (===)", "None"], a: 0 },
                ar: { q: "تقوم Switch بالمقارنة باستخدام:", options: ["المساواة المتساهلة (==)", "المساواة الصارمة (===)", "لا شيء"], a: 0 }
            },
            {
                en: { q: "Can you switch on Strings?", options: ["Yes", "No", "Only chars"], a: 0 },
                ar: { q: "هل يمكن استخدام النصوص في Switch؟", options: ["نعم", "لا", "حروف فقط"], a: 0 }
            },
            {
                en: { q: "Better for ranges (e.g. > 50)?", options: ["Switch", "If..Else", "Both equal"], a: 1 },
                ar: { q: "أفضل للنطاقات (مثل > 50)؟", options: ["Switch", "If..Else", "كلاهما سواء"], a: 1 }
            }
        ]
    },
    // LOOPS: For
    {
        id: 'quiz-for',
        questions: [
            {
                en: { q: "Best for:", options: ["Unknown iterations", "Known iterations", "Infinite loops"], a: 1 },
                ar: { q: "الأفضل لـ:", options: ["تكرار غير معروف", "تكرار معروف العدد", "حلقات لانهائية"], a: 1 }
            },
            {
                en: { q: "For loop parameters are separated by:", options: [",", ";", ":"], a: 1 },
                ar: { q: "تُفصل معاملات حلقة For بـ:", options: [",", ";", ":"], a: 1 }
            },
            {
                en: { q: "Correct order:", options: ["Init; Condition; Increment", "Condition; Init; Increment", "Increment; Condition; Init"], a: 0 },
                ar: { q: "الترتيب الصحيح:", options: ["تهيئة; شرط; زيادة", "شرط; تهيئة; زيادة", "زيادة; شرط; تهيئة"], a: 0 }
            },
            {
                en: { q: "Can you loop through arrays with 'for'?", options: ["Yes, using index", "No", "Only objects"], a: 0 },
                ar: { q: "هل يمكن استخدام 'for' مع المصفوفات؟", options: ["نعم، باستخدام الفهرس", "لا", "للكائنات فقط"], a: 0 }
            },
            {
                en: { q: "$i+=2 means:", options: ["Increment by 1", "Increment by 2", "Multiply by 2"], a: 1 },
                ar: { q: "$i+=2 تعني:", options: ["زيادة بـ 1", "زيادة بـ 2", "ضرب في 2"], a: 1 }
            }
        ]
    },
    // LOOPS: While
    {
        id: 'quiz-while',
        questions: [
            {
                en: { q: "Checks condition:", options: ["Before execution", "After execution", "Never"], a: 0 },
                ar: { q: "تفحص الشرط:", options: ["قبل التنفيذ", "بعد التنفيذ", "أبداً"], a: 0 }
            },
            {
                en: { q: "Ideal when:", options: ["You know the count", "You don't know the count", "Always"], a: 1 },
                ar: { q: "مثالية عندما:", options: ["تعرف العدد", "لا تعرف العدد", "دائماً"], a: 1 }
            },
            {
                en: { q: "If condition is initially false:", options: ["Runs once", "Runs anyway", "Never runs"], a: 2 },
                ar: { q: "إذا كان الشرط خاطئاً من البداية:", options: ["تعمل مرة", "تعمل على أي حال", "لا تعمل أبداً"], a: 2 }
            },
            {
                en: { q: "Main danger:", options: ["Syntax error", "Infinite Loop", "Slow speed"], a: 1 },
                ar: { q: "الخطر الرئيسي:", options: ["خطأ لغوي", "حلقة لانهائية", "بطء السرعة"], a: 1 }
            },
            {
                en: { q: "Alternative that runs at least once:", options: ["For", "Do...While", "Foreach"], a: 1 },
                ar: { q: "البديل الذي يعمل مرة واحدة على الأقل:", options: ["For", "Do...While", "Foreach"], a: 1 }
            }
        ]
    },
    // OUTPUT: Echo/Print
    {
        id: 'quiz-echo',
        questions: [
            {
                en: { q: "Which accepts multiple parameters?", options: ["print", "echo", "printf"], a: 1 },
                ar: { q: "أيهما يقبل معاملات متعددة؟", options: ["print", "echo", "printf"], a: 1 }
            },
            {
                en: { q: "Which behaves like a function (returns 1)?", options: ["echo", "print", "Both"], a: 1 },
                ar: { q: "أيهما يتصرف كدالة (يرجع 1)؟", options: ["echo", "print", "كلاهما"], a: 1 }
            },
            {
                en: { q: "Faster execution (marginally):", options: ["echo", "print", "Same"], a: 0 },
                ar: { q: "أسرع في التنفيذ (بشكل طفيف):", options: ["echo", "print", "نفس الشيء"], a: 0 }
            },
            {
                en: { q: "Can output HTML tags?", options: ["Yes", "No", "Only <b>"], a: 0 },
                ar: { q: "هل يمكن طباعة وسوم HTML؟", options: ["نعم", "لا", "فقط <b>"], a: 0 }
            },
            {
                en: { q: "Symbol for string concatenation:", options: ["+", ".", "&"], a: 1 },
                ar: { q: "رمز دمج النصوص:", options: ["+", ".", "&"], a: 1 }
            }
        ]
    }
];

// Global function to be called from HTML
window.loadQuizTopic = function (topicId) {
    const topicData = quizData.find(d => d.id === topicId);
    if (!topicData) {
        console.error("Topic not found:", topicId);
        return;
    }

    const form = document.getElementById('quiz-form');
    // Hide previous results
    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) resultDiv.style.display = 'none';

    // Set Title (Optional, hidden by CSS usually)
    const titleEl = document.getElementById('quiz-topic-title');
    if (titleEl) titleEl.style.display = 'none';

    renderQuestions(topicData.questions, form);
};

function renderQuestions(questions, form) {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    form.innerHTML = '';

    questions.forEach((qObj, index) => {
        const q = qObj[lang];
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block glass';
        qDiv.id = `q-block-${index}`; // Add ID for feedback targets
        qDiv.style.marginBottom = '2rem';
        qDiv.style.padding = '1.5rem';
        qDiv.style.borderRadius = '12px';
        qDiv.style.background = 'rgba(255, 255, 255, 0.05)';
        qDiv.style.transition = 'all 0.3s ease';

        let optionsHtml = '';
        q.options.forEach((opt, i) => {
            optionsHtml += `
                <div class="option-wrapper" style="margin: 10px 0;">
                    <label style="display:flex; gap:10px; cursor: pointer; align-items:center; width:100%;">
                        <input type="radio" name="q${index}" value="${i}" style="transform:scale(1.2);"> 
                        <span style="font-size:1.05rem;" class="opt-text">${opt}</span>
                    </label>
                </div>
            `;
        });

        qDiv.innerHTML = `
            <p style="font-weight:bold; margin-bottom:1rem; font-size:1.1rem; color:var(--primary-blue);">${index + 1}. ${q.q}</p>
            ${optionsHtml}
            <div class="feedback" style="display:none; margin-top:10px; padding:10px; border-radius:8px; font-weight:bold;"></div>
        `;
        form.appendChild(qDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'quiz-submit-btn';
    submitBtn.className = 'btn';
    submitBtn.style.marginTop = '1rem';
    submitBtn.textContent = lang === 'en' ? 'Submit Answers' : 'إرسال الإجابات';
    submitBtn.addEventListener('click', () => calculateScore(questions));
    form.appendChild(submitBtn);
}

function calculateScore(questions) {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    const form = document.getElementById('quiz-form');
    let score = 0;
    const total = questions.length;
    let allAnswered = true;
    let firstUnansweredIndex = -1;

    // 1. Validation Logic
    questions.forEach((qObj, index) => {
        const selected = form.querySelector(`input[name="q${index}"]:checked`);
        const block = document.getElementById(`q-block-${index}`);

        if (!selected) {
            allAnswered = false;
            // Highlight Unanswered
            block.style.border = "1px solid #f87171"; // Red border
            block.style.boxShadow = "0 0 10px rgba(248, 113, 113, 0.2)"; // Soft glow

            if (firstUnansweredIndex === -1) {
                firstUnansweredIndex = index;
            }
        } else {
            // Reset style
            block.style.border = "none";
            block.style.boxShadow = "none";
            block.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    });

    if (!allAnswered) {
        // Scroll to first unanswered
        if (firstUnansweredIndex !== -1) {
            const firstBlock = document.getElementById(`q-block-${firstUnansweredIndex}`);
            firstBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // 2. Disable button
    const btn = document.getElementById('quiz-submit-btn');
    if (btn) btn.disabled = true;

    // 3. Calculate Score & Show Feedback
    questions.forEach((qObj, index) => {
        const q = qObj[lang];
        const selectedInput = form.querySelector(`input[name="q${index}"]:checked`);
        const block = document.getElementById(`q-block-${index}`);
        const feedbackDiv = block.querySelector('.feedback');
        const correctIndex = q.a;
        const selectedValue = parseInt(selectedInput.value);

        // Remove glow/border before applying result style
        block.style.boxShadow = "none";

        if (selectedValue === correctIndex) {
            // Correct
            score++;
            block.style.background = 'rgba(74, 222, 128, 0.05)';
            block.style.border = "1px solid #4ade80";
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.background = 'rgba(74, 222, 128, 0.1)';
            feedbackDiv.style.color = '#22c55e';
            feedbackDiv.innerHTML = lang === 'en' ? '✅ Correct!' : '✅ إجابة صحيحة!';
        } else {
            // Incorrect
            block.style.background = 'rgba(248, 113, 113, 0.05)';
            block.style.border = "1px solid #f87171";
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.background = 'rgba(248, 113, 113, 0.1)';
            feedbackDiv.style.color = '#ef4444';

            const correctText = q.options[correctIndex];
            feedbackDiv.innerHTML = lang === 'en'
                ? `❌ Incorrect. The correct answer is: <strong>${correctText}</strong>`
                : `❌ خطأ. الإجابة الصحيحة هي: <strong>${correctText}</strong>`;
        }
    });

    // 4. Show Result
    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) {
        resultDiv.style.display = 'block';
        const percent = Math.round((score / total) * 100);

        let comment = '';
        if (score === total) comment = lang === 'en' ? "Perfect Score! You're a PHP Master! 🏆" : "علامة كاملة! أنت خبير PHP! 🏆";
        else if (score >= total * 0.8) comment = lang === 'en' ? "Great Job! Almost there! 🚀" : "عمل رائع! اقتربت جداً! 🚀";
        else if (score >= total * 0.5) comment = lang === 'en' ? "Good effort. Keep practicing! 📚" : "مجهود جيد. استمر في التدريب! 📚";
        else comment = lang === 'en' ? "Don't give up! Review the lessons and try again. 💪" : "لا تستسلم! راجع الدروس وحاول مرة أخرى. 💪";

        resultDiv.innerHTML = `
            <div style="font-size:3rem; font-weight:bold; color:var(--primary-blue);">${percent}%</div>
            <h3 style="font-size:1.5rem; margin-bottom:0.5rem;">${lang === 'en' ? 'Your Score' : 'النتيجة'}: ${score} / ${total}</h3>
            <p style="font-size:1.1rem; color:var(--text-secondary); margin-bottom:1.5rem;">${comment}</p>
            <button class="btn" onclick="document.getElementById('quiz-viewer').scrollTop = 0; location.reload();" style="background:transparent; border:1px solid white;">
                ${lang === 'en' ? 'Take Another Quiz' : 'اختبار آخر'}
            </button>
        `;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}
