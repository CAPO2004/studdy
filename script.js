// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1200);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. THEME TOGGLING (Toggle Switch) --- */
    const themeToggle = document.getElementById('theme-toggle');

    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Set initial checkbox state
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';

        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';

            // Add smooth transition class
            document.body.classList.add('theme-transitioning');

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Re-draw canvas if it exists
            if (typeof initCanvasBackground === 'function') {
                setTimeout(() => initCanvasBackground(), 50);
            }

            // Remove transition class after animation
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 600);
        });
    }

    /* --- 2. LANGUAGE DROPDOWN --- */
    const langBtn = document.getElementById('lang-toggle');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langMenu = document.getElementById('lang-menu');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentFlag = document.getElementById('current-flag');
    const currentLang = localStorage.getItem('lang') || 'en';

    // Initialize language
    setLanguage(currentLang);

    // Toggle dropdown
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });
    }

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            langDropdown.classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
        }
    });

    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Update current flag
        if (currentFlag) {
            if (lang === 'en') {
                currentFlag.src = 'https://flagcdn.com/w40/us.png';
                currentFlag.alt = 'EN';
            } else {
                currentFlag.src = 'https://flagcdn.com/w40/sa.png';
                currentFlag.alt = 'AR';
            }
        }

        // Update active state in dropdown
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
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
            mobileBtn.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('show');
                mobileBtn.classList.remove('active');
            });
        });
    }

    /* --- 4. CANVAS BACKGROUND --- */
    initCanvasBackground();

    /* --- 5. SCROLL REVEAL ANIMATIONS --- */
    initScrollReveal();

    /* --- 6. QUIZ LOGIC --- */
    if (document.getElementById('quiz-container')) {
        initQuiz();
    }
});

/* --- SCROLL REVEAL SYSTEM --- */
function initScrollReveal() {
    const revealElements = [
        { selector: '.card', class: 'reveal' },
        { selector: '.module-card', class: 'reveal-scale' },
        { selector: '.feature-icon-wrapper', class: 'reveal' },
        { selector: '.about-grid > *', class: 'reveal' },
        { selector: '.footer-col', class: 'reveal' },
        { selector: '.topic-pane', class: 'reveal' },
        { selector: '.hero-text', class: 'reveal' },
        { selector: 'section > h2', class: 'reveal' },
        { selector: '.modules-container', class: 'reveal' }
    ];

    revealElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach((el, index) => {
            if (!el.classList.contains('reveal') &&
                !el.classList.contains('reveal-left') &&
                !el.classList.contains('reveal-right') &&
                !el.classList.contains('reveal-scale')) {
                el.classList.add(item.class);
                if (index < 5) {
                    el.classList.add(`reveal-delay-${index + 1}`);
                }
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section .reveal, .hero-section .reveal-scale');
        heroElements.forEach(el => el.classList.add('active'));
    }, 300);
}

/* --- TRANSLATIONS --- */
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

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

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
                ? `rgba(139, 92, 246, ${this.opacity})`
                : `rgba(59, 130, 246, ${this.opacity})`;

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
            },
            {
                en: { q: "What function checks if a GET parameter exists?", options: ["isset()", "exists()", "has()"], a: 0 },
                ar: { q: "ما الدالة للتحقق من وجود معامل GET؟", options: ["isset()", "exists()", "has()"], a: 0 }
            },
            {
                en: { q: "URL: page.php?id=5 - What is $_GET['id']?", options: ["5", "id", "page.php"], a: 0 },
                ar: { q: "الرابط: page.php?id=5 - ما قيمة $_GET['id']؟", options: ["5", "id", "page.php"], a: 0 }
            },
            {
                en: { q: "Multiple GET params are separated by:", options: ["&", ",", ";"], a: 0 },
                ar: { q: "تُفصل معاملات GET المتعددة بـ:", options: ["&", ",", ";"], a: 0 }
            },
            {
                en: { q: "What does htmlspecialchars() prevent?", options: ["SQL Injection", "XSS Attacks", "CSRF"], a: 1 },
                ar: { q: "ما الذي تمنعه htmlspecialchars()؟", options: ["حقن SQL", "هجمات XSS", "CSRF"], a: 1 }
            },
            {
                en: { q: "Default value: $_GET['x'] ?? 10 means:", options: ["Use 10 if x missing", "Always use 10", "Error"], a: 0 },
                ar: { q: "$_GET['x'] ?? 10 تعني:", options: ["استخدم 10 إذا لم يوجد x", "دائماً استخدم 10", "خطأ"], a: 0 }
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
            },
            {
                en: { q: "Check if form submitted via POST:", options: ["$_SERVER['REQUEST_METHOD'] == 'POST'", "$_POST == true", "isPost()"], a: 0 },
                ar: { q: "التحقق من إرسال النموذج عبر POST:", options: ["$_SERVER['REQUEST_METHOD'] == 'POST'", "$_POST == true", "isPost()"], a: 0 }
            },
            {
                en: { q: "filter_var($email, FILTER_VALIDATE_EMAIL) does:", options: ["Validates email format", "Sends email", "Creates email"], a: 0 },
                ar: { q: "filter_var($email, FILTER_VALIDATE_EMAIL) تقوم بـ:", options: ["التحقق من صيغة الإيميل", "إرسال إيميل", "إنشاء إيميل"], a: 0 }
            },
            {
                en: { q: "password_hash() is used for:", options: ["Encrypting passwords safely", "Decoding passwords", "Comparing passwords"], a: 0 },
                ar: { q: "password_hash() تُستخدم لـ:", options: ["تشفير كلمات المرور بأمان", "فك تشفير كلمات المرور", "مقارنة كلمات المرور"], a: 0 }
            },
            {
                en: { q: "For checkboxes, use name='skills[]' to:", options: ["Get array of selected values", "Get single value", "Disable checkbox"], a: 0 },
                ar: { q: "استخدام name='skills[]' للـ checkboxes يعني:", options: ["الحصول على مصفوفة القيم المحددة", "الحصول على قيمة واحدة", "تعطيل الخيار"], a: 0 }
            },
            {
                en: { q: "FILTER_SANITIZE_EMAIL removes:", options: ["Invalid email characters", "The entire email", "Spaces only"], a: 0 },
                ar: { q: "FILTER_SANITIZE_EMAIL يزيل:", options: ["الحروف غير الصالحة للإيميل", "الإيميل كله", "المسافات فقط"], a: 0 }
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
            },
            {
                en: { q: "What does ++$x do?", options: ["Adds 1 and returns new value", "Adds 1 and returns old value", "Subtracts 1"], a: 0 },
                ar: { q: "ماذا تفعل ++$x؟", options: ["تضيف 1 وترجع القيمة الجديدة", "تضيف 1 وترجع القيمة القديمة", "تطرح 1"], a: 0 }
            },
            {
                en: { q: "$x += 5 is same as:", options: ["$x = $x + 5", "$x = 5", "$x == 5"], a: 0 },
                ar: { q: "$x += 5 تعادل:", options: ["$x = $x + 5", "$x = 5", "$x == 5"], a: 0 }
            },
            {
                en: { q: "Result of: 2 ** 3", options: ["6", "8", "9"], a: 1 },
                ar: { q: "نتيجة: 2 ** 3", options: ["6", "8", "9"], a: 1 }
            },
            {
                en: { q: "7 % 2 == 0 checks if 7 is:", options: ["Even", "Odd", "Prime"], a: 0 },
                ar: { q: "7 % 2 == 0 تتحقق إذا كان 7:", options: ["زوجي", "فردي", "أولي"], a: 0 }
            },
            {
                en: { q: "number_format(1234.5, 2) returns:", options: ["1,234.50", "1234.5", "1235"], a: 0 },
                ar: { q: "number_format(1234.5, 2) ترجع:", options: ["1,234.50", "1234.5", "1235"], a: 0 }
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
            },
            {
                en: { q: "5 === '5' is:", options: ["True", "False", "Error"], a: 1 },
                ar: { q: "5 === '5' تكون:", options: ["صحيحة", "خاطئة", "خطأ برمجي"], a: 1 }
            },
            {
                en: { q: "!== means:", options: ["Not identical (value or type differs)", "Not equal", "Identical"], a: 0 },
                ar: { q: "!== تعني:", options: ["ليست متطابقة (القيمة أو النوع مختلف)", "لا تساوي", "متطابقة"], a: 0 }
            },
            {
                en: { q: "1 <=> 2 returns:", options: ["-1", "0", "1"], a: 0 },
                ar: { q: "1 <=> 2 ترجع:", options: ["-1", "0", "1"], a: 0 }
            },
            {
                en: { q: "$x >= 5 means x is:", options: ["Greater than or equal to 5", "Greater than 5", "Equal to 5"], a: 0 },
                ar: { q: "$x >= 5 تعني أن x:", options: ["أكبر من أو يساوي 5", "أكبر من 5", "يساوي 5"], a: 0 }
            },
            {
                en: { q: "null == false is:", options: ["True", "False", "Error"], a: 0 },
                ar: { q: "null == false تكون:", options: ["صحيحة", "خاطئة", "خطأ برمجي"], a: 0 }
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
            },
            {
                en: { q: "$age >= 18 ? 'Adult' : 'Minor' returns 'Adult' when:", options: ["age is 18 or more", "age is exactly 18", "age is less than 18"], a: 0 },
                ar: { q: "$age >= 18 ? 'Adult' : 'Minor' ترجع 'Adult' عندما:", options: ["العمر 18 أو أكثر", "العمر 18 بالضبط", "العمر أقل من 18"], a: 0 }
            },
            {
                en: { q: "&& means:", options: ["AND", "OR", "NOT"], a: 0 },
                ar: { q: "&& تعني:", options: ["AND (و)", "OR (أو)", "NOT (ليس)"], a: 0 }
            },
            {
                en: { q: "|| means:", options: ["AND", "OR", "NOT"], a: 1 },
                ar: { q: "|| تعني:", options: ["AND (و)", "OR (أو)", "NOT (ليس)"], a: 1 }
            },
            {
                en: { q: "if ($x) is true when $x is:", options: ["Any truthy value", "Only true", "Only 1"], a: 0 },
                ar: { q: "if ($x) تكون صحيحة عندما $x:", options: ["أي قيمة حقيقية", "فقط true", "فقط 1"], a: 0 }
            },
            {
                en: { q: "! operator is for:", options: ["Negation (NOT)", "Addition", "Comparison"], a: 0 },
                ar: { q: "المعامل ! يستخدم لـ:", options: ["النفي (NOT)", "الجمع", "المقارنة"], a: 0 }
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
            },
            {
                en: { q: "Multiple cases can share same code using:", options: ["Stacked cases without break", "OR operator", "Both cases together"], a: 0 },
                ar: { q: "يمكن لحالات متعددة مشاركة نفس الكود باستخدام:", options: ["ترتيب الحالات بدون break", "معامل OR", "الحالتين معاً"], a: 0 }
            },
            {
                en: { q: "Switch is best for:", options: ["Multiple exact value matches", "Range comparisons", "Complex conditions"], a: 0 },
                ar: { q: "Switch أفضل لـ:", options: ["مطابقات القيم المتعددة", "مقارنات النطاقات", "الشروط المعقدة"], a: 0 }
            },
            {
                en: { q: "Where should default case be placed?", options: ["Last", "First", "Anywhere"], a: 2 },
                ar: { q: "أين يجب وضع حالة default؟", options: ["آخراً", "أولاً", "أي مكان"], a: 2 }
            },
            {
                en: { q: "Without break, execution:", options: ["Falls through to next case", "Stops", "Jumps to default"], a: 0 },
                ar: { q: "بدون break، التنفيذ:", options: ["يسقط للحالة التالية", "يتوقف", "يقفز لـ default"], a: 0 }
            },
            {
                en: { q: "switch($x) requires $x to be:", options: ["Any expression", "Only string", "Only integer"], a: 0 },
                ar: { q: "switch($x) يتطلب أن $x تكون:", options: ["أي تعبير", "نص فقط", "عدد صحيح فقط"], a: 0 }
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
            },
            {
                en: { q: "for($i=0; $i<5; $i++) runs how many times?", options: ["4", "5", "6"], a: 1 },
                ar: { q: "for($i=0; $i<5; $i++) تعمل كم مرة؟", options: ["4", "5", "6"], a: 1 }
            },
            {
                en: { q: "'break' inside for loop:", options: ["Exits the loop", "Skips current iteration", "Does nothing"], a: 0 },
                ar: { q: "'break' داخل حلقة for:", options: ["يخرج من الحلقة", "يتخطى التكرار الحالي", "لا يفعل شيء"], a: 0 }
            },
            {
                en: { q: "'continue' inside for loop:", options: ["Exits the loop", "Skips to next iteration", "Repeats current"], a: 1 },
                ar: { q: "'continue' داخل حلقة for:", options: ["يخرج من الحلقة", "يتخطى للتكرار التالي", "يكرر الحالي"], a: 1 }
            },
            {
                en: { q: "foreach is best for:", options: ["Arrays", "Known count", "Conditions"], a: 0 },
                ar: { q: "foreach أفضل لـ:", options: ["المصفوفات", "العدد المعروف", "الشروط"], a: 0 }
            },
            {
                en: { q: "Nested loops run:", options: ["Inner * Outer times", "Inner + Outer times", "Once"], a: 0 },
                ar: { q: "الحلقات المتداخلة تعمل:", options: ["الداخلية × الخارجية مرة", "الداخلية + الخارجية مرة", "مرة واحدة"], a: 0 }
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
            },
            {
                en: { q: "do...while checks condition:", options: ["Before execution", "After execution", "Never"], a: 1 },
                ar: { q: "do...while تفحص الشرط:", options: ["قبل التنفيذ", "بعد التنفيذ", "أبداً"], a: 1 }
            },
            {
                en: { q: "while(true) creates:", options: ["Infinite loop", "No loop", "Error"], a: 0 },
                ar: { q: "while(true) تُنشئ:", options: ["حلقة لانهائية", "لا حلقة", "خطأ"], a: 0 }
            },
            {
                en: { q: "To prevent infinite loop, you must:", options: ["Update condition variable", "Use break only", "Nothing"], a: 0 },
                ar: { q: "لمنع الحلقة اللانهائية، يجب:", options: ["تحديث متغير الشرط", "استخدام break فقط", "لا شيء"], a: 0 }
            },
            {
                en: { q: "Reading file until EOF uses:", options: ["while(!feof($file))", "for loop", "if statement"], a: 0 },
                ar: { q: "قراءة ملف حتى النهاية تستخدم:", options: ["while(!feof($file))", "حلقة for", "جملة if"], a: 0 }
            },
            {
                en: { q: "while($row = mysqli_fetch_array($result)) is used for:", options: ["Database results", "File reading", "User input"], a: 0 },
                ar: { q: "while($row = mysqli_fetch_array($result)) تُستخدم لـ:", options: ["نتائج قاعدة البيانات", "قراءة الملفات", "إدخال المستخدم"], a: 0 }
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
            },
            {
                en: { q: "echo \"Hello $name\" uses:", options: ["Variable interpolation", "Concatenation", "Nothing"], a: 0 },
                ar: { q: "echo \"Hello $name\" تستخدم:", options: ["استبدال المتغير", "الدمج", "لا شيء"], a: 0 }
            },
            {
                en: { q: "Single quotes ' ' vs double quotes \" \":", options: ["Double interprets variables", "Single interprets variables", "Same"], a: 0 },
                ar: { q: "علامات التنصيص المفردة ' ' مقابل المزدوجة \" \":", options: ["المزدوجة تفسر المتغيرات", "المفردة تفسر المتغيرات", "نفس الشيء"], a: 0 }
            },
            {
                en: { q: "echo 'Hello ' . $name uses:", options: ["Variable interpolation", "Concatenation", "Both"], a: 1 },
                ar: { q: "echo 'Hello ' . $name تستخدم:", options: ["استبدال المتغير", "الدمج", "كلاهما"], a: 1 }
            },
            {
                en: { q: "\\n in double quotes means:", options: ["New line", "Tab", "Nothing"], a: 0 },
                ar: { q: "\\n في علامات التنصيص المزدوجة تعني:", options: ["سطر جديد", "مسافة Tab", "لا شيء"], a: 0 }
            },
            {
                en: { q: "printf() is for:", options: ["Formatted output", "Simple output", "File output"], a: 0 },
                ar: { q: "printf() تُستخدم لـ:", options: ["الطباعة المنسقة", "الطباعة البسيطة", "طباعة الملفات"], a: 0 }
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
    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) resultDiv.style.display = 'none';

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
        qDiv.id = `q-block-${index}`;
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

    questions.forEach((qObj, index) => {
        const selected = form.querySelector(`input[name="q${index}"]:checked`);
        const block = document.getElementById(`q-block-${index}`);

        if (!selected) {
            allAnswered = false;
            block.style.border = "1px solid #f87171";
            block.style.boxShadow = "0 0 10px rgba(248, 113, 113, 0.2)";

            if (firstUnansweredIndex === -1) {
                firstUnansweredIndex = index;
            }
        } else {
            block.style.border = "none";
            block.style.boxShadow = "none";
            block.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    });

    if (!allAnswered) {
        if (firstUnansweredIndex !== -1) {
            const firstBlock = document.getElementById(`q-block-${firstUnansweredIndex}`);
            firstBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    const btn = document.getElementById('quiz-submit-btn');
    if (btn) btn.disabled = true;

    questions.forEach((qObj, index) => {
        const q = qObj[lang];
        const selectedInput = form.querySelector(`input[name="q${index}"]:checked`);
        const block = document.getElementById(`q-block-${index}`);
        const feedbackDiv = block.querySelector('.feedback');
        const correctIndex = q.a;
        const selectedValue = parseInt(selectedInput.value);

        block.style.boxShadow = "none";

        if (selectedValue === correctIndex) {
            score++;
            block.style.background = 'rgba(74, 222, 128, 0.05)';
            block.style.border = "1px solid #4ade80";
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.background = 'rgba(74, 222, 128, 0.1)';
            feedbackDiv.style.color = '#22c55e';
            feedbackDiv.innerHTML = lang === 'en' ? '✅ Correct!' : '✅ إجابة صحيحة!';
        } else {
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
            <h3 style="font-size:1.5rem; margin-bottom:0.5rem;">
                <span class="lang-en">Your Score</span><span class="lang-ar">النتيجة</span>: ${score} / ${total}
            </h3>
            <p style="font-size:1.1rem; color:var(--text-secondary); margin-bottom:1.5rem;">${comment}</p>
            <button id="quiz-retry-btn" class="btn" style="background: var(--gradient-main); color: white; border: none; padding: 12px 28px; font-size: 1rem; cursor: pointer;">
                <span class="lang-en">Take Another Quiz</span>
                <span class="lang-ar">اختبار آخر</span>
            </button>
        `;

        // Add click event for the retry button
        const retryBtn = document.getElementById('quiz-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                // Try hideQuiz first (new quiz.html), fallback to reload
                if (typeof hideQuiz === 'function') {
                    hideQuiz();
                } else {
                    location.reload();
                }
            });
        }

        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}
