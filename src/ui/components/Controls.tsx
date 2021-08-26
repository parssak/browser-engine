import { useState } from 'react';
import { useEffect } from 'react';
import ComponentManager from '../../engine/core/ComponentManager';
import useEditor from '../../state/editor/useEditor';
import useScene from '../../state/scene/useScene';

interface ComponentFieldValueProps {
  field: Engine.ComponentPropType;
  updateField: (field: Engine.ComponentPropType) => void;
}

const ComponentFieldValue = ({ field, updateField }: ComponentFieldValueProps): React.ReactElement => {

  const handleUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof field === 'number') {
      updateField(Number(e.target.value));
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
        className="bg-gray-700 w-16 font-mono text-xs"
      />
    </div>
  );

  if (Array.isArray(field)) return (
    <div>array field</div>
  );

  return (
    <div className="bg-gray-700 text-white px-2 grid grid-cols-3 gap-1">
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">x:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.x}
          onChange={e => updateField({ x: Number(e.target.value), y: field?.y ?? 0, z: field?.z ?? 0 })}
          className="bg-gray-700 w-12 font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">y:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.y}
          onChange={e => updateField({ x: field?.x ?? 0, y: Number(e.target.value), z: field?.z ?? 0 })}
          className="bg-gray-700 w-12 font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">z:</span>
        <input
          type={typeof field === 'string' ? 'string' : 'number'}
          value={field.z}
          onChange={e => updateField({ x: field?.x ?? 0, y: field?.y ?? 0, z: Number(e.target.value) })}
          className="bg-gray-700 w-12 font-mono text-xs"
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
      <h3 className="mb-2">{componentType}</h3>
      <div className="space-y-2">
        {
          Object.entries(componentProps).map(([fieldName, fieldValue]) => (
            <div key={fieldName} className="flex space-x-2">
              <p className="text-xs font-mono text-gray-200" style={{ minWidth: '10ch' }}>{fieldName}</p>
              <ComponentFieldValue field={fieldValue} updateField={e => updateComponent(componentType, fieldName, e)} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default function Controls() {
  const { isRunning } = useEditor()
  const { selectedEntity, updateEntity, sceneConfig, } = useScene();

  const [controls, setControls] = useState<Record<Engine.ComponentType, Engine.ComponentProps>>({});
  const [materialType, setMaterialType] = useState<Engine.MaterialType>('normal');
  const [geometryType, setGeometryType] = useState<Engine.GeometryType>('box');

  useEffect(() => {
    if (!selectedEntity) return;
    setMaterialType(selectedEntity.material);
    setGeometryType(selectedEntity.geometry);
  }, [selectedEntity])

  // * Handles populating all correct value fields when selecting entity */
  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const propFields: Record<Engine.ComponentType, Engine.ComponentProps> = {};
      Object.entries(entity.components).forEach(([type, props]) => {
        propFields[type] = props;
      });
      setControls({ ...propFields } as any);
    }
    if (selectedEntity) updateComponentFields(selectedEntity);
  }, [selectedEntity, sceneConfig, isRunning]);

  const addComponent = (componentName: Engine.ComponentType) => {
    if (!selectedEntity) return;
    const componentProps = ComponentManager.instance.getComponentProps(componentName);
    // const newComponentName = 'mover';
    // const newComponentProps: Engine.ComponentProps = {
    //   speed: 0.05
    // };
    // const newComponentName = 'rotator';
    // const newComponentProps: Engine.ComponentProps = {
    //   speed: 0.05
    // };
    if (!componentProps) return;
    selectedEntity.components[componentName] = componentProps;
    updateEntity(selectedEntity);
  }

  const updateComponent = (type: Engine.ComponentType, field: string, value: Engine.ComponentPropType) => {
    const newControls = { ...controls };
    newControls[type][field] = value;
    setControls(newControls);
    if (selectedEntity) {
      selectedEntity.components = newControls;
      updateEntity({ ...selectedEntity });
    }
  }

  const updateMaterial = (newMaterial: Engine.MaterialType) => {
    setMaterialType(newMaterial);
    if (selectedEntity) {
      selectedEntity.material = newMaterial;
      updateEntity({ ...selectedEntity });
    }
  }

  const updateGeometry = (newGeometry: Engine.GeometryType) => {
    setGeometryType(newGeometry);
    if (selectedEntity) {
      selectedEntity.geometry = newGeometry;
      updateEntity({ ...selectedEntity });
    }
  }

  // todo: context.sceneManager.getSelectedEntityPayload()?.components?.transform.rotation

  if (!selectedEntity) return (<div className="bg-gray-900 h-full flex flex-col space-y-1"></div>)

  const getComponentOptions = (): { label: string, value: string }[] => {
    const components = ComponentManager.instance.getComponents();
    return Object.keys(components).map(component => ({ label: component, value: component }));
  }

  const componentOptions = getComponentOptions();

  const materialOptions: { label: string, value: string }[] = [
    {
      label: 'Normal',
      value: 'normal',
    },
    {
      label: 'Basic',
      value: 'basic',
    },
    {
      label: 'Lambert',
      value: 'lambert',
    },
    {
      label: 'Phong',
      value: 'phong'
    }
  ]

  const geometryOptions: { label: string, value: string }[] = [
    {
      label: 'Box',
      value: 'box'
    },
    {
      label: 'Sphere',
      value: 'sphere',
    },
    {
      label: 'Torus',
      value: 'torus',
    },
  ]

  return (
    <div className="bg-gray-900 h-full flex flex-col space-y-1">
      <section className="space-y-2">
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
      </section>
      <section>
        {
          componentOptions.map(({ label, value }) => (
            <button
              className="block mx-auto mt-2"
              onClick={() => addComponent(value)}
              key={value}>Add {label}</button>
          ))
        }
      </section>
      <section>
        <div className="bg-gray-800 text-white p-2">
          <h3>Mesh</h3>
          <div className="space-y-2">
            <div className="flex space-x-2 items-center">
              <p className="text-xs font-mono text-gray-200" style={{ minWidth: '10ch' }}>Material</p>
              <select onChange={e => updateMaterial(e.target.value)} defaultValue={materialType}>
                {
                  materialOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                }
              </select>
            </div>
            <div className="flex space-x-2 items-center">
              <p className="text-xs font-mono text-gray-200" style={{ minWidth: '10ch' }}>Geometry</p>
              <select onChange={e => updateGeometry(e.target.value)} value={geometryType}>
                {
                  geometryOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                }
              </select>
            </div>
          </div>
        </div>
      </section>
    </div >
  )
}