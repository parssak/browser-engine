import { useState } from "react"
import { useEffect } from "react"
import ComponentManager from "../../../engine/core/ComponentManager"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import ComponentNode from "./ComponentNode"

export default function InspectorPanel() {
  const { isRunning } = useEditor()
  const { selectedEntity, updateEntity, sceneConfig } = useScene()

  const [controls, setControls] = useState<
    Record<Engine.ComponentType, Engine.ComponentProps>
  >({})
  const [materialType, setMaterialType] = useState<Engine.MaterialType>("normal")
  const [geometryType, setGeometryType] = useState<Engine.GeometryType>("box")

  useEffect(() => {
    if (!selectedEntity) return
    setMaterialType(selectedEntity.material)
    setGeometryType(selectedEntity.geometry)
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

  const getComponentOptions = (): { label: string; value: string }[] => {
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

  const materialOptions: { label: string; value: string }[] = [
    {
      label: "Normal",
      value: "normal",
    },
    {
      label: "Basic",
      value: "basic",
    },
    {
      label: "Lambert",
      value: "lambert",
    },
    {
      label: "Phong",
      value: "phong",
    },
    {
      label: "Cool Material",
      value: "coolMat",
    },
  ]

  const geometryOptions: { label: string; value: string }[] = [
    {
      label: "Box",
      value: "box",
    },
    {
      label: "Sphere",
      value: "sphere",
    },
    {
      label: "Torus",
      value: "torus",
    },
  ]

  if (!selectedEntity)
    return (
      <Panel label="Inspector" />
    )

  return (
    <Panel label="Inspector">
      {/* Components */}
      <section className="space-y-2">
        {Object.entries(controls).map(([type, props]) => (
          <ComponentNode
            componentType={type}
            componentProps={props}
            key={type}
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
      <section>
        <div className="bg-gray-800 text-white">
          <h3>Mesh</h3>
          <div className="space-y-2">
            <div className="flex space-x-2 items-center">
              <p
                className="text-xs font-mono text-gray-200"
                style={{ minWidth: "10ch" }}
              >
                Material
              </p>
              <select
                onChange={(e) => updateMaterial(e.target.value)}
                defaultValue={materialType}
              >
                {materialOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2 items-center">
              <p
                className="text-xs font-mono text-gray-200"
                style={{ minWidth: "10ch" }}
              >
                Geometry
              </p>
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
    </Panel>
  )
}
