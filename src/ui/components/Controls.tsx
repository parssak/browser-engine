import { button, folder, useControls } from 'leva'
import { useCallback, useEffect, useMemo, useState } from 'react';
import useScene from '../../state/useScene';
// import Agent from '../../engine/entities/Agent';
import getComponentProps from '../../utils/getComponentProps';

export default function Controls() {
  const { config, selectedEntity } = useScene();

  const entity = useMemo(() => {
    const selected = config.entities.flatMap(e => e.id === selectedEntity && e)
    if (selected.length < 1) return null;
    return selected[0] || null;
  }, []);

  // const [entity, setEntity] = useState<Entity>();
  // const addEntity = () => {
    // setEntity(new Agent());
  // }

  const getControls: any = useCallback(() => {
    if (!entity) return {};
    // const props = entity.GetProps();
    // const propControls: any = {};
    // for (const prop of props) {
    //   if (typeof prop[1] === 'object') {
    //     propControls[prop[0]] = folder(getComponentProps(prop[0], prop[1]) as any);
    //     continue;
    //   }
    //   propControls[prop[0]] = prop[1];
    // }
    // return propControls;
  }, [entity]);
  

  const controls = useControls(() => ({...getControls()}),  [entity]);
  // useControls({ 'New Agent': button(addEntity) })
  
  const onInspectorValueChange = () => {
    if (!entity) return;
    const inspectorProps = Object.entries(controls[0]);
    // const entityProps = entity.GetProps();
    // for (const ep of entityProps) {
    //   if (typeof ep[1] === 'object') {
    //     const subProps = getComponentProps(ep[0], ep[1])
    //     for (const sp of Object.entries(subProps)) {
    //       const inspectorSubProp = inspectorProps.find(p => p[0] === sp[0]);
    //       if (inspectorSubProp) {
    //         // @ts-ignore
    //         entity[ep[0]][sp[0]] = inspectorSubProp[1];
    //       }
    //     }
    //     continue;
    //   }
    //   const inspectorBasicProp = inspectorProps.find(p => p[0] === ep[0]);
    //   if (inspectorBasicProp) {
    //     // @ts-ignore
    //     entity[ep[0]] = inspectorBasicProp[1];
    //   }
    // }
  }

  useEffect(() => {
    onInspectorValueChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);
  return <></>;
}
