import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { GamePage } from "./pages/GamePage";

function App() {
  useEffect(() => {
    // 1. Lógica do Dark Mode (do seu script.js)
    const themeBtn = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeBtn) themeBtn.textContent = '☀️';
    }

    const handleTheme = () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';
    };

    themeBtn?.addEventListener('click', handleTheme);

    // 2. Animação ao Rolar (Reveal)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => themeBtn?.removeEventListener('click', handleTheme);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogar" element={<GamePage />} />
      </Routes>
      <footer className="main-footer">
        <div className="footer-content">
          <h3>Guardiãs das Águas</h3>
          <p>&copy; 2026 Guardiãs das Águas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;