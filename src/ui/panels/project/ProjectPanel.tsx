import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import useScripts from "../../../state/scripts/useScripts"
import Panel from "../Panel"
import ProjectNode from "./ProjectNode"

export default function ProjectPanel(): ReactElement {
  const { sceneConfig } = useScene()
  const { scripts, loadScript, selectedScript } = useScripts()
  return (
    <Panel label="Project" bodyClass="space-y-2">
      <ProjectNode title="Scripts">
        {scripts.map((s) => (
          <div
            className={`project-node
          ${selectedScript?.id === s.id && "bg-gray-500"}
          ${
            selectedScript?.id === s.id ? "hover:bg-gray-600" : "hover:bg-gray-500"
          }`}
            onClick={() => loadScript(s.name)}
            key={s.id}
          >
            {s.name}.{s.language}
          </div>
        ))}
      </ProjectNode>

      <ProjectNode title="Prefabs"></ProjectNode>

      <ProjectNode title="Materials">
        {
          sceneConfig.materials.map(material => (
            <div key={material.id}>
              {material.name}
            </div>
          ))
        }
      </ProjectNode>
    </Panel>
  )
}
