import { folder, Leva,  useControls } from 'leva'
import useScene from '../../state/scene/useScene';

export default function Controls() {
  const { selectedEntity } = useScene();

  const getControls = () => {
    if (!selectedEntity) return {};
    const { components } = selectedEntity;

    const componentControls = Object.entries(components).map(([type, props]) => {
      const folderValue =
        Object.fromEntries(
          Object.entries(props)
            .map(([propName, propValue]) => [propName, { value: propValue }]
          )
        );
      return [type, folder(folderValue as any)]
    });
    return Object.fromEntries(componentControls);
  }

  const controls = useControls(getControls as any, [selectedEntity]);
  console.debug({ controls });

  return (
    <div className="bg-indigo-500 space-y-1">
      <Leva fill flat titleBar={false} />
    </div>
  );
}
