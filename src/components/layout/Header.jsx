import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <header>
      <nav className="nav-container">
        <div className="logo">Guardiãs</div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Início</Link>
          </li>
          <li>
            <Link to="/jogar" className={`special-link ${location.pathname === "/jogar" ? "active" : ""}`}>
              Jogar: Como nascem as guardiãs
            </Link>
          </li>
          <div className="accessibility-tools">
            <button id="read-page" className="acc-btn">🔊 Ouvir</button>
            <button id="theme-toggle" className="dark-mode-toggle">🌙</button>
          </div>
        </ul>
      </nav>
    </header>
  );
};