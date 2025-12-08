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

    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Re-draw canvas if it exists
        if (typeof initCanvasBackground === 'function') {
            // Slight delay to allow CSS var update
            setTimeout(() => initCanvasBackground(), 50);
        }
    });

    function updateThemeIcon(theme) {
        // Sun for Light Mode (to switch to dark), Moon for Dark Mode
        themeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
        themeBtn.title = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }


    /* --- 2. LANGUAGE TOGGLING (FULL CONTENT) --- */
    const langBtn = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'en';

    setLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        const lang = document.documentElement.getAttribute('lang');
        const newLang = lang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Update Button Icon (Globe is static, maybe change tooltip or internal state)
        // langBtn.textContent = lang === 'en' ? '🌐' : '🌐'; 
        // Or specific flags? Let's use text inside or just the globe. User asked for Icon.
        // Let's toggle between "EN" and "عربي" icons or just use Globe.
        // If user wants icon, we can use a globe, but to show state:
        langBtn.textContent = lang === 'en' ? 'ع' : 'En'; // Simple indication of what it switches TO? Or current?
        // Actually user said "Icon". Let's use a Globe 🌐 
        langBtn.textContent = '🌐';
        langBtn.title = lang === 'en' ? 'Switch to Arabic' : 'Switch to English';


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
        'btn-start': 'Start Learning Now',
        'welcome': 'Master Modern PHP Development',
        'header-subtitle': 'The most comprehensive resource for learning server-side programming. Interactive lessons, real-world examples, and instant feedback quizzes.'
    },
    ar: {
        'nav-home': 'الرئيسية',
        'nav-lessons': 'الدروس',
        'nav-examples': 'أمثلة',
        'nav-quiz': 'اختبار',
        'nav-report': 'التقرير',
        'footer-vision': 'رؤيتنا الاستراتيجية',
        'footer-contact': 'اتصل بنا',
        'btn-start': 'ابدأ التعلم الآن',
        'welcome': 'احترف برمجة PHP الحديثة',
        'header-subtitle': 'المصدر الشامل لتعلم برمجة جانب الخادم. دروس تفاعلية، أمثلة واقعية، واختبارات فورية.'
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
            // Use CSS var colors for particles? 
            // Let's match the Blue/Purple theme
            // Light Mode: Blue/Purple, Dark Mode: Glowy Purple
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
function initQuiz() {
    // We need to handle Bilingual Quiz
    // We can define questions for both languages in JS

    const questions = [
        {
            en: { q: "What does PHP stand for?", options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private Home Page"], a: 1 },
            ar: { q: "ماذا يعني اختصار PHP؟", options: ["الصفحة الشخصية", "PHP: المعالج المسبق للنصوص التشعبية", "الصفحة الخاصة"], a: 1 }
        },
        {
            en: { q: "Which symbol starts a variable in PHP?", options: ["&", "%", "$"], a: 2 },
            ar: { q: "أي رمز يبدأ به المتغير في PHP؟", options: ["&", "%", "$"], a: 2 }
        },
        {
            en: { q: "How do you check a condition in PHP?", options: ["if", "check", "verify"], a: 0 },
            ar: { q: "كيف تتحقق من شرط في PHP؟", options: ["if", "check", "verify"], a: 0 }
        }
        // Add more questions... (Shortened for brevity here, logic scales)
    ];

    let currentScore = 0;
    const form = document.getElementById('quiz-form');

    if (!form) return;

    // Render Questions based on Language
    function renderQuiz() {
        const lang = document.documentElement.getAttribute('lang') || 'en';
        form.innerHTML = '';

        questions.forEach((qObj, index) => {
            const q = qObj[lang]; // Get English or Arabic version
            const qDiv = document.createElement('div');
            qDiv.className = 'question-block glass';
            qDiv.style.marginBottom = '2rem';
            qDiv.style.padding = '1.5rem';
            qDiv.style.borderRadius = '12px';

            let optionsHtml = '';
            q.options.forEach((opt, i) => {
                optionsHtml += `
                    <label style="display:block; margin: 10px 0; cursor: pointer;">
                        <input type="radio" name="q${index}" value="${i}"> 
                        ${opt}
                    </label>
                `;
            });

            qDiv.innerHTML = `
                <p style="font-weight:bold; margin-bottom:1rem;">${index + 1}. ${q.q}</p>
                ${optionsHtml}
            `;
            form.appendChild(qDiv);
        });

        // Add Submit Button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn';
        submitBtn.textContent = lang === 'en' ? 'Submit Answers' : 'إرسال الإجابات';
        submitBtn.addEventListener('click', calculateScore);
        form.appendChild(submitBtn);
    }

    function calculateScore() {
        const lang = document.documentElement.getAttribute('lang') || 'en';
        currentScore = 0;
        const resultDiv = document.getElementById('result');
        const blocks = form.querySelectorAll('.question-block');

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const block = blocks[index];

            // Clear previous styles
            block.style.border = '1px solid var(--glass-border)';

            if (selected) {
                if (parseInt(selected.value) === q.en.a) { // Answer index is same for both
                    currentScore++;
                    block.style.borderColor = '#10b981'; // Green
                } else {
                    block.style.borderColor = '#ef4444'; // Red
                }
            }
        });

        const total = questions.length;
        const msg = lang === 'en'
            ? `You scored ${currentScore} out of ${total}`
            : `لقد حصلت على ${currentScore} من ${total}`;

        resultDiv.innerHTML = `<h3 style="color: var(--primary-blue)">${msg}</h3>`;
    }

    // Re-render when language changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'lang') {
                renderQuiz();
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Initial Render
    renderQuiz();
}
