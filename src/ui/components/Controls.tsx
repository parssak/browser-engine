import * as THREE from 'three';
import { button, useControls } from 'leva'
import { useEffect, useState } from 'react';
import Agent from '../../engine/entities/Agent';

export default function Controls({}) {
  const [agent, setAgent] = useState<any>();
  const addAgent = () => {
    const a = new Agent({
      transform: {
        position: new THREE.Vector3(10, 3, 3)
      }
    });
    setAgent(a);
  }
  const agentControls = useControls({ 'New Agent': button(addAgent), 'Position': { x: 0, y: 0, z: 0 }, 'Speed': { min: 0, max: 0.1, value: 0.03 } })

  useEffect(() => {
    if (!agent) return;
    agent.transform.position.x = agentControls.Position.x;
    agent.transform.position.y = agentControls.Position.y;
    agent.transform.position.z = agentControls.Position.z;
    agent.speed = agentControls.Speed;
  }, [agentControls]);
  return <></>;
}
