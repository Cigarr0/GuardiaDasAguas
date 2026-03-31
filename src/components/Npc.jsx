import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export const Npc = ({ model, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(model);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={scene.clone()} />
      </RigidBody>
    </group>
  );
};