import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";

export const Experience = () => {
  const shadowCameraRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  // Lógica para detetar o TAB
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setShowMenu(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "Tab") {
        setShowMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Menu Leva: Apenas o mapa de teste, escondido por padrão
  const { map } = useControls("Menu de Jogo", {
    map: {
      value: "teste1",
      options: ["teste1"],
    },
  }, { hidden: !showMenu });

  return (
    <>
      {/* CSS para forçar o Leva a ser um menu Fullscreen centralizado quando visível */}
      {showMenu && (
        <style>
          {`
            .leva-c-kWgByx { 
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background: rgba(0, 0, 0, 0.8) !important;
              backdrop-filter: blur(5px);
            }
            .leva-c-hSxeHe { width: 400px !important; } /* Tamanho da caixa do menu */
          `}
        </style>
      )}

      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>

      <Physics key={map}>
        {/* Apenas o mapa teste1 com os seus valores originais */}
        <Map
          scale={3}
          position={[-1, -6, 0.5]}
          model={`models/teste1.glb`}
        />
        <CharacterController />
      </Physics>
    </>
  );
};