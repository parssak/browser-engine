import { folder, Leva, useControls } from 'leva'
import { useState } from 'react';
import { useEffect } from 'react';
import { generateComponentObjectFromValues } from '../../state/scene/scene.utils';
import useScene from '../../state/scene/useScene';

interface ComponentFieldValueProps {
  field: Engine.ComponentPropType;
}

const ComponentFieldValue = ({ field }: ComponentFieldValueProps): React.ReactElement => {
  if (typeof field === 'string') return (<div>string field</div>);
  if (typeof field === 'number') return (<div>number field</div>);
  if (Array.isArray(field)) return (<div>array field</div>);
  return (
    <div className="bg-gray-700 text-white grid grid-cols-3 gap-5 px-4 w-full">
      <div>
        <span className="pr-2 text-sm text-gray-400">x:</span>
        {<span>{field?.x ?? 0}</span>}
      </div>
      <div>
        <span className="pr-2 text-sm text-gray-400">y:</span>
        {<span>{field?.y ?? 0}</span>}
      </div>
      <div>
        <span className="pr-2 text-sm text-gray-400">z:</span>
        {<span>{field?.z ?? 0}</span>}
      </div>
    </div>
  )
}

interface ComponentNodeProps {
  componentType: Engine.ComponentType;
  componentProps: Engine.ComponentProps;
}

const ComponentNode = ({
  componentType,
  componentProps,
}: ComponentNodeProps): React.ReactElement => {

  return (
    <div className="bg-gray-500 p-1 rounded-md">
      <h3 className="font-semibold">{componentType}</h3>
      {
        Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <p className="text-sm" style={{ minWidth: '7ch' }}>{fieldName}</p>
            <ComponentFieldValue field={fieldValue} />
          </div>
        ))
      }
    </div>
  )
}

export default function Controls() {
  const { selectedEntity, updateEntity, sceneConfig } = useScene();

  // utils
  // const getComponentPropName = (type: Engine.ComponentType, propName: string): Engine.CombinedComponentPropName => `${type}--${propName}`

  const getControls = () => {
    console.debug('getControls()');
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

  const [controls, setControls] = useState<Record<Engine.ComponentType, Engine.ComponentProps>>({});



  useEffect(() => {
    // * Handles populating all correct value fields when selecting entity
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const propFields: Record<Engine.ComponentType, Engine.ComponentProps> = {};
      Object.entries(entity.components).forEach(([type, props]) => {
        propFields[type] = props;
      });
      console.debug('setting', propFields);
      setControls({ ...propFields } as any);
    }

    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity]);

  // Handles updating the entity when pressing save
  const saveEntityChanges = () => {
    if (!selectedEntity) return;
    const updatedComponents = generateComponentObjectFromValues(controls);
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
      {
        Object.entries(controls).map(([type, props]) => <ComponentNode componentType={type} componentProps={props} key={type} />)
      }
      {/* <Leva fill flat titleBar={false} /> */}
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
