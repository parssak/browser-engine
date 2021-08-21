import { folder, Leva,  useControls } from 'leva'
import { useEffect } from 'react';
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

  const [values, set]: any = useControls(getControls as any, [selectedEntity]);

  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      console.debug(entity.components, values, set);
      const flattenedPropFields: Record<string, Engine.ComponentPropType> = {};
      Object.values(entity.components).forEach((component) => {
        const [fieldName, fieldValue] = Object.entries(component)[0];
        flattenedPropFields[fieldName] = fieldValue;
      });
      set(flattenedPropFields);
    }
    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity])

  useEffect(() => {
    console.debug('values changed', values);
  }, [values])

  return (
    <div className="bg-indigo-500 space-y-1">
      <Leva fill flat titleBar={false} />
    </div>
  );
}
