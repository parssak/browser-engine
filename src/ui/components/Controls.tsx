import { folder, Leva, useControls } from 'leva'
import { useEffect } from 'react';
import { generateComponentObjectFromValues } from '../../state/scene/scene.utils';
import useScene from '../../state/scene/useScene';

export default function Controls() {
  const { selectedEntity, updateEntity, sceneConfig } = useScene();

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

  const [values, set]: any = useControls(getControls as any, [selectedEntity, sceneConfig]);

  // Handles populating all correct value fields when selecting entity
  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const flattenedPropFields: Record<string, Engine.ComponentPropType> = {};
      Object.entries(entity.components).forEach(([type, props]) => {
        const [propName, propValue] = Object.entries(props)[0];
        flattenedPropFields[getComponentPropName(type, propName)] = propValue;
      });
      // TODO: Fix why fields aren't resetting
      console.debug(flattenedPropFields);
      set(flattenedPropFields);
    }

    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity, set])


  // Handles updating the entity when a field is changed
  const saveEntityChanges = () => {
    if (!selectedEntity) return;
    const updatedComponents = generateComponentObjectFromValues(values);
    selectedEntity.components = updatedComponents;
    updateEntity({ ...selectedEntity });
  }

  const addComponent = () => {
    if (!selectedEntity) return;
    // TODO: make this feature fledged later
    const newComponentName = 'mover';
    const newComponentProps: Engine.ComponentProps = {
        'speed': 1
      }
    selectedEntity.components[newComponentName] = newComponentProps;
    updateEntity(selectedEntity);
  }

  return (
    <div className="bg-indigo-500 h-full flex flex-col space-y-1">
      <Leva fill flat titleBar={false} />
      {
        selectedEntity && (
          <div className="space-y-1">
            <button
              className="block mx-auto mt-12 py-2 px-4 md:w-48  rounded-md bg-indigo-100 opacity-60 transition hover:opacity-100 hover:bg-indigo-200 capitalize"
              onClick={addComponent}>Add component
            </button>
            <button
              className="block mx-auto mt-12 py-2 px-4 md:w-48 rounded-md bg-indigo-100 opacity-60 transition hover:opacity-100 hover:bg-indigo-200 capitalize"
              onClick={saveEntityChanges}>Save Changes
            </button>
          </div>
        )
      }
    </div>
  );
}
