import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import HierarchyNode from "./HierarchyNode"

export default function Hierarchy(): ReactElement {
  const { sceneConfig } = useScene()
  return (
    <div className="bg-indigo-200 p-1.5 space-y-1">
      {sceneConfig.entities.map((entity) => (
        <HierarchyNode key={entity.id} entity={entity} />
      ))}
    </div>
  )
}
