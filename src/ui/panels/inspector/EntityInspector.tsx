import { ReactElement, useEffect, useState } from "react"
import ComponentManager from "../../../engine/core/ComponentManager"
import GeometryManager from "../../../engine/core/GeometryManager"
import MaterialManager from "../../../engine/core/MaterialManager"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import ComponentNode from "./entity/ComponentNode"
import LightNode from "./entity/LightNode"

interface Props {
  selectedEntity: Engine.EntityProps
}

interface SelectOption {
  label: string
  value: string
}

export default function EntityInspector({ selectedEntity }: Props): ReactElement {
  const { updateEntity, sceneConfig } = useScene()
  const { isRunning } = useEditor()

  const [controls, setControls] = useState<
    Record<Engine.ComponentType, Engine.ComponentProps>
  >({})
  const [materialType, setMaterialType] = useState<Engine.MaterialType>("normal")
  const [geometryType, setGeometryType] = useState<Engine.GeometryType>("box")

  useEffect(() => {
    if (!selectedEntity) return
    setMaterialType(selectedEntity.material ?? "")
    setGeometryType(selectedEntity.geometry ?? "")
  }, [selectedEntity])

  // * Handles populating all correct value fields when selecting entity */
  useEffect(() => {
    const updateComponentFields = (entity: Engine.EntityProps) => {
      const propFields: Record<Engine.ComponentType, Engine.ComponentProps> = {}
      Object.entries(entity.components).forEach(([type, props]) => {
        propFields[type] = props
      })
      setControls({ ...propFields } as any)
    }
    if (selectedEntity) updateComponentFields(selectedEntity)
  }, [selectedEntity, sceneConfig, isRunning])

  const handleChangeName = (newName: string) => {
    if (!selectedEntity) return
    updateEntity({ ...selectedEntity, name: newName })
  }
  const addComponent = (componentName: Engine.ComponentType) => {
    if (!selectedEntity) return
    const componentProps = ComponentManager.instance.getComponentProps(componentName)
    if (!componentProps) return
    selectedEntity.components[componentName] = componentProps
    updateEntity(selectedEntity)
  }

  const updateComponent = (
    type: Engine.ComponentType,
    field: string,
    value: Engine.ComponentPropType
  ) => {
    const newControls = { ...controls }
    newControls[type][field] = value
    setControls(newControls)
    if (selectedEntity) {
      selectedEntity.components = newControls
      updateEntity({ ...selectedEntity })
    }
  }

  const getComponentOptions = (): SelectOption[] => {
    const components = ComponentManager.instance.getComponents()
    if (!selectedEntity) return []
    const currentComponents = Object.keys(selectedEntity?.components)
    return Object.keys(components)
      .filter((c) => !currentComponents.includes(c))
      .map((component) => ({
        label: component,
        value: component,
      }))
  }

  const componentOptions = getComponentOptions()

  const updateLightProps = (updatedProps: Engine.LightProps) => {
    if (selectedEntity) {
      selectedEntity.lightProps = updatedProps
      updateEntity({ ...selectedEntity })
    }
  }

  // #region -- mesh --
  const updateMaterial = (newMaterial: Engine.MaterialType) => {
    setMaterialType(newMaterial)
    if (selectedEntity) {
      selectedEntity.material = newMaterial
      updateEntity({ ...selectedEntity })
    }
  }

  const updateGeometry = (newGeometry: Engine.GeometryType) => {
    setGeometryType(newGeometry)
    if (selectedEntity) {
      selectedEntity.geometry = newGeometry
      updateEntity({ ...selectedEntity })
    }
  }

  const getMaterialOptions = (): SelectOption[] => {
    return Object.keys(MaterialManager.instance.materials).map((material) => ({
      label: material,
      value: material,
    }))
  }

  const materialOptions: SelectOption[] = getMaterialOptions()

  const getGeometryOptions = (): SelectOption[] => {
    return Object.keys(GeometryManager.instance.geometries).map((geometry) => ({
      label: geometry,
      value: geometry,
    }))
  }

  const geometryOptions: SelectOption[] = getGeometryOptions()
  // #endregion

  return (
    <Panel label="Inspector">
      <h1>
        <input
          className="transition bg-gray-800 hover:bg-gray-700 focus:bg-gray-900"
          type="text"
          defaultValue={selectedEntity?.name}
          key={selectedEntity?.id ?? ''}
          onBlur={(e) => handleChangeName(e.target.value)}
          // @ts-ignore
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
        />
      </h1>
      {/* Components */}
      <section className="space-y-2">
        {Object.entries(controls).map(([type, props]) => (
          <ComponentNode
            componentType={type}
            componentProps={props}
            key={type}
            componentScriptID={""}
            updateComponent={updateComponent}
          />
        ))}
      </section>

      {/* Add components */}
      {componentOptions.length > 0 && (
        <section>
          <select onChange={(e) => console.log(e.target.value)}>
            {componentOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="grid place-items-center mt-2">
            <button onClick={() => addComponent(componentOptions[0].value)}>
              Add Component
            </button>
          </div>
        </section>
      )}

      {/* Mesh */}
      {selectedEntity.type === "basic" && (
        <section>
          <div className="bg-gray-800 text-white">
            <h3>Mesh</h3>
            <div className="space-y-2">
              <div className="flex space-x-2 items-center">
                <p className="inspector-field-label">Material</p>
                <select
                  onChange={(e) => updateMaterial(e.target.value)}
                  value={materialType}
                >
                  {materialOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="inspector-field-label">Geometry</p>
                <select
                  onChange={(e) => updateGeometry(e.target.value)}
                  value={geometryType}
                >
                  {geometryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Light */}
      {selectedEntity.type === "light" && selectedEntity.lightProps && (
        <LightNode
          lightProps={selectedEntity.lightProps}
          updateLightProps={updateLightProps}
        />
      )}
    </Panel>
  )
}
