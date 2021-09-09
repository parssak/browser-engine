import { ReactElement } from "react"
import useScene from "../../../state/scene/useScene"
import useScripts from "../../../state/scripts/useScripts"
import Panel from "../Panel"
import ProjectNodeWrapper from "./ProjectNodeWrapper"
import ScriptNode from "./ScriptNode"

export default function ProjectPanel(): ReactElement {
  const { sceneConfig, selectedMaterial, selectMaterial } = useScene()
  const { scripts, loadScript, selectedScript } = useScripts()
  return (
    <Panel label="Project" bodyClass="space-y-2">
      <ProjectNodeWrapper title="Scripts">
        {scripts.map((s) => (
          <ScriptNode key={s.id} script={s} />
        ))}
      </ProjectNodeWrapper>

      <ProjectNodeWrapper title="Prefabs"></ProjectNodeWrapper>

      <ProjectNodeWrapper title="Materials">
        {sceneConfig.materials.map((material) => (
          <div
            key={material.id}
            className={`project-node ${
              selectedMaterial?.id === material.id && "bg-gray-500"
            }
          ${
            selectedMaterial?.id === material.id
              ? "hover:bg-gray-600"
              : "hover:bg-gray-500"
          }`}
            onClick={() => selectMaterial(material.id)}
          >
            {material.name}
          </div>
        ))}
      </ProjectNodeWrapper>
    </Panel>
  )
}
