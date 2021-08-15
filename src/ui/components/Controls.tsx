import { button, folder, useControls } from 'leva'
import { useCallback, useEffect, useState } from 'react';
import Entity from '../../engine/core';
import Agent from '../../engine/entities/Agent';
import getComponentProps from '../../engine/utils/getComponentProps';

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
        propControls[prop[0]] = folder(getComponentProps(prop[0] as Component, prop[1]) as any);
        continue;
      }
      propControls[prop[0]] = prop[1];
    }
    return propControls;
  }, [entity]);
  

  const controls = useControls(() => getControls(),  [entity]);
  useControls({'New Agent': button(addEntity)})

  useEffect(() => {
    if (!entity) return;
    // todo: get entity props updating from inspector values
    const inspectorProps = Object.entries(controls[0]);
    const entityProps = entity.GetProps();
    console.debug(entityProps);
    for (const ep of entityProps) {
      if (typeof ep[1] === 'object') {
        const subProps = getComponentProps(ep[0] as Component, ep[1])
        console.debug('sub props', subProps);
        continue;
      }
      console.debug('basic prop', ep, inspectorProps.find(p => p[0] === ep[0]));
    }
      // entity.SetProp(prop[0], prop[1]);
    // agent.transform.position.x = controls.Position.x;
    // agent.transform.position.y = controls.Position.y;
    // agent.transform.position.z = controls.Position.z;
  }, [controls]);
  return <></>;
}
