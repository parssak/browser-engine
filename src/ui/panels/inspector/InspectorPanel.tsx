import { useState } from "react"
import { useEffect } from "react"
import ComponentManager from "../../../engine/core/ComponentManager"
import context from "../../../engine/core/EngineContext"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"
import useScripts from "../../../state/scripts/useScripts"
import Panel from "../Panel"
import EntityInspector from "./EntityInspector"
import ComponentNode from "./entity/ComponentNode"
import MaterialInspector from "./MaterialInspector"

export default function InspectorPanel() {
  // const { isRunning } = useEditor()
  const { selectedEntity, selectedMaterial, updateEntity, sceneConfig } = useScene()
  const { loadScript } = useScripts()

  // const [controls, setControls] = useState<
  //   Record<Engine.ComponentType, Engine.ComponentProps>
  // >({})
  // const [materialType, setMaterialType] = useState<Engine.MaterialType>("normal")
  // const [geometryType, setGeometryType] = useState<Engine.GeometryType>("box")

  // useEffect(() => {
  //   if (!selectedEntity) return
  //   setMaterialType(selectedEntity.material)
  //   setGeometryType(selectedEntity.geometry)
  // }, [selectedEntity])

  // // * Handles populating all correct value fields when selecting entity */
  // useEffect(() => {
  //   const updateComponentFields = (entity: Engine.EntityProps) => {
  //     const propFields: Record<Engine.ComponentType, Engine.ComponentProps> = {}
  //     Object.entries(entity.components).forEach(([type, props]) => {
  //       propFields[type] = props
  //     })
  //     setControls({ ...propFields } as any)
  //   }
  //   if (selectedEntity) updateComponentFields(selectedEntity)
  // }, [selectedEntity, sceneConfig, isRunning])

  // const addComponent = (componentName: Engine.ComponentType) => {
  //   if (!selectedEntity) return
  //   const componentProps = ComponentManager.instance.getComponentProps(componentName)
  //   if (!componentProps) return
  //   selectedEntity.components[componentName] = componentProps
  //   updateEntity(selectedEntity)
  // }

  // const updateComponent = (
  //   type: Engine.ComponentType,
  //   field: string,
  //   value: Engine.ComponentPropType
  // ) => {
  //   const newControls = { ...controls }
  //   newControls[type][field] = value
  //   setControls(newControls)
  //   if (selectedEntity) {
  //     selectedEntity.components = newControls
  //     updateEntity({ ...selectedEntity })
  //   }
  // }

  // const updateMaterial = (newMaterial: Engine.MaterialType) => {
  //   setMaterialType(newMaterial)
  //   if (selectedEntity) {
  //     selectedEntity.material = newMaterial
  //     updateEntity({ ...selectedEntity })
  //   }
  // }

  // const updateGeometry = (newGeometry: Engine.GeometryType) => {
  //   setGeometryType(newGeometry)
  //   if (selectedEntity) {
  //     selectedEntity.geometry = newGeometry
  //     updateEntity({ ...selectedEntity })
  //   }
  // }

  // const getComponentOptions = (): { label: string; value: string }[] => {
  //   const components = ComponentManager.instance.getComponents()
  //   if (!selectedEntity) return []
  //   const currentComponents = Object.keys(selectedEntity?.components)
  //   return Object.keys(components)
  //     .filter((c) => !currentComponents.includes(c))
  //     .map((component) => ({
  //       label: component,
  //       value: component,
  //     }))
  // }

  // const componentOptions = getComponentOptions()

  // const getMaterialOptions = (): { label: string; value: string }[] => {
  //   return Object.keys(context.materialManager.materials).map((material) => ({
  //     label: material,
  //     value: material,
  //   }))
  // }

  // const materialOptions: { label: string; value: string }[] = getMaterialOptions()
  // // const materialOptions: { label: string; value: string }[] = [
  // //   {
  // //     label: "Normal",
  // //     value: "normal",
  // //   },
  // //   {
  // //     label: "Basic",
  // //     value: "basic",
  // //   },
  // //   {
  // //     label: "Lambert",
  // //     value: "lambert",
  // //   },
  // //   {
  // //     label: "Phong",
  // //     value: "phong",
  // //   },
  // //   {
  // //     label: "Cool Material",
  // //     value: "coolMat",
  // //   },
  // // ]

  // const geometryOptions: { label: string; value: string }[] = [
  //   {
  //     label: "Box",
  //     value: "box",
  //   },
  //   {
  //     label: "Sphere",
  //     value: "sphere",
  //   },
  //   {
  //     label: "Torus",
  //     value: "torus",
  //   },
  // ]
  
  if (selectedMaterial) return (
    <MaterialInspector selectedMaterial={selectedMaterial} />
  )
  else if (selectedEntity) return (
    <EntityInspector selectedEntity={selectedEntity} />
  )
  else return <Panel label="Inspector" />

}
