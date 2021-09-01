import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import Panel from "../Panel"
import HierarchyLightNode from "./HierarchyLightNode"
import HierarchyNode from "./HierarchyNode"

export default function HierarchyPanel(): ReactElement {
  const { sceneConfig } = useScene()
  return (
    <Panel label="Hierarchy">
      <div className="space-y-1">
        {sceneConfig.entities.map((entity) => (
          <HierarchyNode key={entity.id} entity={entity} />
        ))}
        {sceneConfig.lights.map((light) => (
          <HierarchyLightNode key={light.id} light={light} />
        ))}
      </div>
    </Panel>
  )
}
