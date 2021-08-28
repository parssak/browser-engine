import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import HierarchyNode from "./HierarchyNode"

export default function HierarchyPanel(): ReactElement {
  const { sceneConfig } = useScene()
  return (
    <div className="panel">
      <h4 className="panel-label">Hierarchy</h4>
      {sceneConfig.entities.map((entity) => (
        <HierarchyNode key={entity.id} entity={entity} />
      ))}
    </div>
  )
}
