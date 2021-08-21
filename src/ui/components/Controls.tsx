import { folder, Leva,  useControls } from 'leva'
import { useEffect } from 'react';
import useScene from '../../state/scene/useScene';

export default function Controls() {
  const { selectedEntity } = useScene();

  // util
  const getComponentPropName = (type: Engine.ComponentType, propName: string): string => `${type}--${propName}`

  const getControls = () => {
    if (!selectedEntity) return {};
    const { components } = selectedEntity;

    const componentControls = Object.entries(components).map(([type, props]) => {
      const folderValue =
        Object.fromEntries(
          Object.entries(props)
            .map(([propName, propValue]) => [`${type}--${propName}`,{ value: propValue, label: propName }]
          )
        );
      return [type, folder(folderValue as any)]
    });
    return Object.fromEntries(componentControls);
  }

  const [values, set]: any = useControls(getControls as any, [selectedEntity]);

  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const flattenedPropFields: Record<string, Engine.ComponentPropType> = {};
      Object.entries(entity.components).forEach(([type, props]) => {
        const [fieldName, fieldValue] = Object.entries(props)[0];
        flattenedPropFields[`${type}--${fieldName}`] = fieldValue;
      });
      set(flattenedPropFields);
    }
    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity])

  return (
    <div className="bg-indigo-500 space-y-1">
      <Leva fill flat titleBar={false} />
    </div>
  );
}
