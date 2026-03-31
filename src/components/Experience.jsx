import { Environment, OrthographicCamera, useGLTF } from "@react-three/drei";
import { Physics, RigidBody, CylinderCollider } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";

// Componente do NPC
const Npc = ({ model, position, rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(model);
  
  return (
    <group position={position} rotation={rotation}>
      {/* Corpo rígido fixo para colisão com a personagem */}
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={scene} />
      </RigidBody>

      {/* Sensor de proximidade (invisível) para detectar o jogador futuramente */}
      <RigidBody sensor type="fixed">
        <CylinderCollider args={[1.5, 2]} /> 
      </RigidBody>
    </group>
  );
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

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

  const { map } = useControls("Menu de Jogo", {
    map: {
      value: "teste1",
      options: ["teste1"],
    },
  }, { hidden: !showMenu });

  return (
    <>
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
              z-index: 1000;
            }
            .leva-c-hSxeHe { width: 400px !important; }
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
        <Map
          scale={3}
          position={[-1, -6, 0.5]}
          model={`models/teste1.glb`}
        />

        {/* Adicionando a NPC no mapa */}
        {/* Ajuste o position [X, Y, Z] conforme necessário para brotar no lugar certo */}
        <Npc 
          scale={0.42}
          model={`models/Npc/Maria.glb`}
          position={[0, -5.5, 1]} 
          rotation={[0, Math.PI, 0]} 
        />

        <CharacterController />
      </Physics>
    </>
  );
};