import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export const Npc = ({ model, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(model);

  const Npc = ({ model, position, scale = 1, rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(model);
  
  // O segredo para a escala funcionar em modelos externos:
  const clone = React.useMemo(() => {
    const sceneClone = scene.clone();
    sceneClone.scale.set(scale, scale, scale); // Aplica a escala direto no objeto
    return sceneClone;
  }, [scene, scale]);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={clone} />
      </RigidBody>
    </group>
  );
};

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={scene.clone()} />
      </RigidBody>
    </group>
  );
};