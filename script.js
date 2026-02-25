// VLibras
if (window.VLibras) { new window.VLibras.Widget('https://vlibras.gov.br/app'); }

// MODO ESCURO
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// LEITOR DE TELA (Ouvir conteúdo do MAIN)
const readBtn = document.getElementById('read-page');
let isReading = false;
if (readBtn) {
    readBtn.addEventListener('click', () => {
        if (isReading) {
            window.speechSynthesis.cancel();
            isReading = false;
            readBtn.textContent = '🔊 Ouvir';
            return;
        }
        const textToRead = document.querySelector('main').innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        utterance.onstart = () => { isReading = true; readBtn.textContent = '⏹️ Parar'; };
        utterance.onend = () => { isReading = false; readBtn.textContent = '🔊 Ouvir'; };
        window.speechSynthesis.speak(utterance);
    });
}

// ANIMAÇÃO AO ROLAR
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));