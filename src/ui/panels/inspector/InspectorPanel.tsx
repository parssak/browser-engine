import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import EntityInspector from "./EntityInspector"
import LightInspector from "./LightInspector"
import MaterialInspector from "./MaterialInspector"

export default function InspectorPanel() {
  const { selectedEntity, selectedMaterial, selectedLight } = useScene()
  
  if (selectedMaterial) return (
    <MaterialInspector selectedMaterial={selectedMaterial} />
  )
  else if (selectedEntity) return (
    <EntityInspector selectedEntity={selectedEntity} />
  )
  else if (selectedLight) return (
    <LightInspector selectedLight={selectedLight} />
  )
  else return <Panel label="Inspector" />

}
