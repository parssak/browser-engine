import { useEffect, useState } from "react"
import ComponentManager from "../../../engine/core/ComponentManager"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"

const useInspector = () => {
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
}

export default useInspector
