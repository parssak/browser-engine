import { useControls } from 'leva'
import { useCallback, useEffect, useMemo } from 'react';
import useScene from '../../state/scene/useScene';

interface ControlPanelProps {
  type: Engine.ComponentType;
  props: Engine.ComponentProps
};

const ControlPanel = ({ type, props }: ControlPanelProps) => {
  return (
    <section>
      <h2>{type}</h2>
    </section>
  )
}

export default function Controls() {
  const { selectedEntity } = useScene();
  if (!selectedEntity) return (<div className="bg-indigo-500 p-1.5 space-y-1">
    <h1 className="font-medium">Controls</h1>
    <p>No entity selected.</p>
  </div>)

  return (
    <div className="bg-indigo-500 p-1.5 space-y-1">
      <h1 className="font-medium">Controls</h1>
      {
        Object.entries(selectedEntity.components)
          .map(
            ([type, props]: [Engine.ComponentType, Engine.ComponentProps]) =>
              <ControlPanel key={type} type={type} props={props} />
          )
      }
    </div>
  );
}
