import { useState } from 'react';
import { useEffect } from 'react';
import { generateComponentObjectFromValues } from '../../state/scene/scene.utils';
import useScene from '../../state/scene/useScene';

interface ComponentFieldValueProps {
  field: Engine.ComponentPropType;
  updateField: (field: Engine.ComponentPropType) => void;
}

const ComponentFieldValue = ({ field, updateField }: ComponentFieldValueProps): React.ReactElement => {

  const handleUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof field === 'number') {
      // if (Number.isNaN(Number(e.target.value))) {
        // return;
      // }
      updateField(Number(e.target.value));
      // todo
      return;
    }

    if (typeof field === 'string') {
      updateField(e.target.value);
    }
    
  }


  if (typeof field === 'number' || typeof field === 'string') return (
    <div className="bg-gray-700 text-white px-1  w-max">
      <input
        type={typeof field === 'string' ? 'string' : 'number'}
        value={typeof field === 'number' ? field : field}
        onChange={handleUpdateField}
        className="bg-gray-700 w-min font-mono text-xs"
      />
    </div>
  );

  if (Array.isArray(field)) return (<div>array field</div>);

  return (
    <div className="bg-gray-700 text-white px-2 grid grid-cols-3 gap-5">
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">x:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.x}
          onChange={e => updateField({x: Number(e.target.value), y: field?.y ?? 0, z: field?.z ?? 0})}
          className="bg-gray-700 w-min font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">y:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.y}
          onChange={e => updateField({ x: field?.x ?? 0, y: Number(e.target.value), z: field?.z ?? 0 })}
          className="bg-gray-700 w-min font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">z:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.z}
          onChange={e => updateField({ x: field?.x ?? 0, y: field?.y ?? 0, z: Number(e.target.value) })}
          className="bg-gray-700 w-min font-mono text-xs"
        />
      </pre>
    </div>
  )
}

interface ComponentNodeProps {
  componentType: Engine.ComponentType;
  componentProps: Engine.ComponentProps;
  updateComponent: (type: Engine.ComponentType, field: string, value: Engine.ComponentPropType) => void;
}

const ComponentNode = ({
  componentType,
  componentProps,
  updateComponent
}: ComponentNodeProps): React.ReactElement => {

  return (
    <div className="bg-gray-800 text-white p-2">
      <h3 className="font-semibold text-gray-300 text-sm mb-2">{componentType}</h3>
      {
        Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <p className="text-xs font-mono text-gray-200" style={{ minWidth: '10ch' }}>{fieldName}</p>
            <ComponentFieldValue field={fieldValue} updateField={e => updateComponent(componentType, fieldName, e)} />
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

  // const getControls = () => {
  //   console.debug('getControls()');
  //   if (!selectedEntity) return {};

  //   const { components } = selectedEntity;

  //   const componentControls = Object.entries(components).map(([type, props]) => {
  //     const folderValue =
  //       Object.fromEntries(
  //         Object.entries(props)
  //           .map(([propName, propValue]) => [propName, { value: propValue }]
  //           )
  //       );
  //     return [type, folder(folderValue as any)]
  //   });
  //   return Object.fromEntries(componentControls);
  // }

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
  }, [selectedEntity, sceneConfig]);

  // Handles updating the entity when pressing save
  // const saveEntityChanges = () => {
  //   if (!selectedEntity) return;
  //   const updatedComponents = generateComponentObjectFromValues(controls);
  //   selectedEntity.components = updatedComponents;
  //   updateEntity({ ...selectedEntity });
  // }

  const addComponent = () => {
    if (!selectedEntity) return;
    // TODO: make this feature fledged later
    const newComponentName = 'mover';
    const newComponentProps: Engine.ComponentProps = {
      'speed': 0.2
    }
    selectedEntity.components[newComponentName] = newComponentProps;
    updateEntity(selectedEntity);
  }

  const updateComponent = (type: Engine.ComponentType, field: string, value: Engine.ComponentPropType) => {
    console.debug(type, field, value, controls);
    const newControls = { ...controls };
    newControls[type][field] = value;
    console.debug('new controls', newControls);
    setControls(newControls);
  }

  return (
    <div className="bg-gray-900 h-full flex flex-col space-y-1">
      {
        Object.entries(controls).map(([type, props]) =>
          <ComponentNode
            componentType={type}
            componentProps={props}
            key={type}
            updateComponent={updateComponent}
          />
        )
      }
      {
        selectedEntity && (
          <div className="space-y-1">
            <button
              className="block mx-auto mt-12 py-2 px-4 md:w-48  rounded-md bg-indigo-100 opacity-60 transition hover:opacity-100 hover:bg-indigo-200 capitalize"
              onClick={addComponent}>Add component
            </button>
            {/* <button
              className="block mx-auto mt-12 py-2 px-4 md:w-48 rounded-md bg-indigo-100 opacity-60 transition hover:opacity-100 hover:bg-indigo-200 capitalize"
              onClick={saveEntityChanges}>Save Changes
            </button> */}
          </div>
        )
      }
    </div>
  );
}
