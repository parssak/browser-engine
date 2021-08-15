import { button, useControls } from 'leva'
import { useEffect, useState } from 'react';
import Entity from '../../engine/core';
import Agent from '../../engine/entities/Agent';

export default function Controls({ }) {
  const [entity, setEntity] = useState<Entity>();
  const addEntity = () => {
    setEntity(new Agent());
  }

  const getControls = (): any => {
    if (!entity) return {};
    const props = entity.GetProps();
    const propControls: any = {};
    for (const prop of props) {
      if (typeof prop[1] === 'object') {
        console.debug(prop[0], 'is a component');
        continue;
      }
      propControls[prop[0]] = prop[1];
    }
    return propControls;
  }
  const controls = useControls(getControls());
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
