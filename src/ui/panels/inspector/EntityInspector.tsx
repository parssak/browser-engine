import { Leva } from "leva"
import { ReactElement, useEffect, useState } from "react"
import ComponentManager from "../../../engine/core/ComponentManager"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"
import { SelectOption } from "../../interfaces"
import Panel from "../Panel"
import CameraNode from "./entity/CameraNode"
import ComponentNode from "./entity/ComponentNode"
import LightNode from "./entity/LightNode"
import MeshNode from "./entity/MeshNode"

interface Props {
  selectedEntity: Engine.EntityProps
}

export default function EntityInspector({ selectedEntity }: Props): ReactElement {
  const { updateEntity, sceneConfig } = useScene()
  const { isRunning } = useEditor()

  const [controls, setControls] = useState<
    Record<Engine.ComponentType, Engine.ComponentProps>
  >({})


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
    if (!selectedEntity || selectedEntity.type === "camera") return
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

  const updateCameraProps = (updatedProps: Engine.CameraProps) => {
    if (selectedEntity) {
      selectedEntity.cameraProps = updatedProps
      updateEntity({ ...selectedEntity })
    }
  }

  const showShadowOptions = (): boolean => {
    return !(
      selectedEntity.type === "light" &&
      selectedEntity.lightProps &&
      selectedEntity.lightProps.type === "ambient"
    )
  }

  return (
    <Panel label="Inspector">
      <h1>
        <input
          className="transition bg-gray-800 hover:bg-gray-700 focus:bg-gray-900"
          type="text"
          defaultValue={selectedEntity?.name}
          key={selectedEntity?.id ?? ""}
          onBlur={(e) => handleChangeName(e.target.value)}
          disabled={selectedEntity?.type === "camera"}
          // @ts-ignore
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
        />
      </h1>
      <section className="space-y-2 py-2">
        <div className="flex space-x-2">
          <p className="inspector-field-label">Visible</p>
          <input
            type="checkbox"
            checked={selectedEntity.visible}
            onChange={(e) =>
              updateEntity({ ...selectedEntity, visible: e.target.checked })
            }
          />
        </div>
        {showShadowOptions() && (
          <>
            <div className="flex space-x-2">
              <p className="inspector-field-label">Cast shadow</p>
              <input
                type="checkbox"
                checked={selectedEntity.castShadow}
                onChange={(e) =>
                  updateEntity({ ...selectedEntity, castShadow: e.target.checked })
                }
              />
            </div>
            <div className="flex space-x-2">
              <p className="inspector-field-label">Receive shadow</p>
              <input
                type="checkbox"
                checked={selectedEntity.receiveShadow}
                onChange={(e) =>
                  updateEntity({
                    ...selectedEntity,
                    castShadow: e.target.checked,
                  })
                }
              />
            </div>
          </>
        )}
      </section>

      {/* Light */}
      {selectedEntity.type === "light" && selectedEntity.lightProps && (
        <LightNode
          lightProps={selectedEntity.lightProps}
          updateLightProps={updateLightProps}
          key={selectedEntity.id}
        />
      )}

      {/* Camera */}
      {selectedEntity.type === "camera" && selectedEntity.cameraProps && (
        <CameraNode
          cameraProps={selectedEntity.cameraProps}
          updateCameraProps={updateCameraProps}
        />
      )}

      {/* Components */}
      <section className="space-y-2">
        {Object.entries(controls).map(([type, props]) => (
          <ComponentNode
            componentType={type}
            componentProps={props}
            key={`${type}--${selectedEntity.id}`}
            componentScriptID={""}
            updateComponent={updateComponent}
          />
        ))}
        <Leva fill flat titleBar={false} />
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
      {selectedEntity.type === "basic" && <MeshNode selectedEntity={selectedEntity} />}
    </Panel>
  )
}
