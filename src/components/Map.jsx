import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export const Map = ({ model, ...props }) => {
  const { scene, animations } = useGLTF(model);
  const group = useRef();
  
  // Ligamos as animações à referência do grupo que envolve a cena
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Garante que o cenário projeta e recebe sombras
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (actions) {
      console.log("Animações detectadas no mapa:", Object.keys(actions)); // Debug para ver no console do navegador
      
      // Tenta dar play em absolutamente todas as tracks encontradas
      Object.keys(actions).forEach((key) => {
        actions[key].reset().play();
      });
    }
  }, [actions]);

  return (
    <group ref={group}> 
      <RigidBody type="fixed" colliders="trimesh">
        {/* Passamos as props (position/scale) para o primitive */}
        <primitive object={scene} {...props} />
      </RigidBody>
    </group>
  );
};