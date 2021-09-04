import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import EntityInspector from "./EntityInspector"
import MaterialInspector from "./MaterialInspector"

export default function InspectorPanel() {
  const { selectedEntity, selectedMaterial} = useScene()
  
  if (selectedMaterial) return (
    <MaterialInspector selectedMaterial={selectedMaterial} />
  )
  else if (selectedEntity) return (
    <EntityInspector selectedEntity={selectedEntity} />
  )
  else return <Panel label="Inspector" />

}
