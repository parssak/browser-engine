import { folder, Leva, useControls } from 'leva'
import { type } from 'os';
import { useEffect } from 'react';
import { generateComponentObjectFromValues } from '../../state/scene/scene.utils';
import useScene from '../../state/scene/useScene';
import { deepClone } from '../../utils';

export default function Controls() {
  const { selectedEntity, updateEntity } = useScene();

  // utils
  const getComponentPropName = (type: Engine.ComponentType, propName: string): Engine.CombinedComponentPropName => `${type}--${propName}`

  const getControls = () => {
    if (!selectedEntity) return {};
    const { components } = selectedEntity;

    const componentControls = Object.entries(components).map(([type, props]) => {
      const folderValue =
        Object.fromEntries(
          Object.entries(props)
            .map(([propName, propValue]) => [getComponentPropName(type, propName), { value: propValue, label: propName }]
            )
        );
      return [type, folder(folderValue as any)]
    });
    return Object.fromEntries(componentControls);
  }

  const [values, set]: any = useControls(getControls as any, [selectedEntity]);

  // Handles populating all correct value fields when selecting entity
  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const flattenedPropFields: Record<string, Engine.ComponentPropType> = {};
      Object.entries(entity.components).forEach(([type, props]) => {
        const [propName, propValue] = Object.entries(props)[0];
        flattenedPropFields[getComponentPropName(type, propName)] = propValue;
      });
      set(flattenedPropFields);
    }

    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity, set])

  // Handles updating the entity when a field is changed
  const saveEntityChanges = () => {
    if (!selectedEntity) return;
    const updatedComponents = generateComponentObjectFromValues(values);
    if (JSON.stringify(updatedComponents) !== JSON.stringify(selectedEntity.components)) {
      // const newEntity = deepClone<Engine.EntityProps>(entity);
      // newEntity.components = updatedComponents;
      // updateEntity(newEntity);
      console.debug('saved');
      selectedEntity.components = updatedComponents;
      updateEntity(selectedEntity);
    }
  }
  // useEffect(() => {
  //   if (selectedEntity) handleEntityUpdate(selectedEntity, values);
  // }, [values, selectedEntity]);


  return (
    <div className="bg-indigo-500 space-y-1">
      <Leva fill flat titleBar={false} />
      {
        selectedEntity && (
          <button
            className="mx-2 p-2 rounded-md bg-indigo-200 transition hover:bg-indigo-300 capitalize"
            onClick={saveEntityChanges}>Save Changes
          </button>
        )
      }
    </div>
  );
}
