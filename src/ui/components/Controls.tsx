import { button, folder, useControls } from 'leva'
import { useCallback, useEffect, useState } from 'react';
import Entity from '../../engine/core';
import Agent from '../../engine/entities/Agent';

export default function Controls({ }) {
  const [entity, setEntity] = useState<Entity>();
  const addEntity = () => {
    setEntity(new Agent());
  }

  const getControls: any = useCallback(() => {
    if (!entity) return {};
    const props = entity.GetProps();
    const propControls: any = {};
    for (const prop of props) {
      if (typeof prop[1] === 'object') {
        console.debug(prop[0], 'is a component');
        // todo create helper for parsing components (left off here)
        continue;
      }
      propControls[prop[0]] = prop[1];
    }
    return propControls;
  }, [entity]);
  
  // todo make each component have it's own controls dynamically

  const controls = useControls(() => getControls(),  [entity]);
  useControls({'New Agent': button(addEntity)})

  useEffect(() => {
    if (!entity) return;
    console.debug(entity.GetProps());
    // agent.transform.position.x = controls.Position.x;
    // agent.transform.position.y = controls.Position.y;
    // agent.transform.position.z = controls.Position.z;
    // agent.speed = controls.Speed;
  }, [controls]);
  return <></>;
}
