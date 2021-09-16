import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import HierarchyNode from "./HierarchyNode"

export default function HierarchyPanel(): ReactElement {
  const { sceneConfig } = useScene()

  return (
    <Panel label="Hierarchy">
      <div className="space-y-1">
        {sceneConfig.entities.map((entity) => (
          <HierarchyNode key={entity.id} entity={entity} parent={null} />
        ))}
      </div>
    </Panel>
  )
}
