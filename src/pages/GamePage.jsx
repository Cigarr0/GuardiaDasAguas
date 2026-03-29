import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";
import { useRef } from "react";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

export const GamePage = () => {
  const gameContainerRef = useRef();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Entra em tela cheia no container do jogo
      gameContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Erro ao tentar ativar Fullscreen: ${err.message}`);
      });
    } else {
      // Sai da tela cheia
      document.exitFullscreen();
    }
  };

  return (
    <main>
      <section className="hero-brand reveal active">
        <h1 className="main-title">Como nascem as guardiãs</h1>
        <h2 className="sub-title">Explore e proteja o nosso minimundo</h2>
      </section>

      <section className="container reveal active" style={{ paddingTop: 0 }}>
        {/* Usamos a ref aqui para que apenas o jogo e o botão fiquem em tela cheia */}
        <div id="game-canvas-container" ref={gameContainerRef} style={{ position: 'relative' }}>
          
          {/* Botão de Fullscreen Estilizado */}
          <button 
            onClick={toggleFullscreen}
            className="fullscreen-btn"
            title="Tela Cheia"
          >
            ⛶
          </button>

          <KeyboardControls map={keyboardMap}>
            <Canvas shadows camera={{ position: [3, 3, 3], fov: 40 }}>
              <color attach="background" args={["#ececec"]} />
              <Experience />
            </Canvas>
          </KeyboardControls>
        </div>

        {/* ... restante dos cards de objetivo/controles ... */}
      </section>
    </main>
  );
};