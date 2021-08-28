import { ReactElement } from "react"
import useScripts from "../../../state/scripts/useScripts"

export default function ProjectPanel(): ReactElement {
  const { scripts, loadScript, selectedScript } = useScripts()
  return (
    <div className="panel">
      <h4 className="panel-label">Project</h4>

      {/* Scripts */}
      <details>
        <summary>Scripts</summary>
        {scripts.map((s) => (
          <div
            className={`p-1
          rounded-sm
          transition
          cursor-pointer
          select-none
        text-white
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
      </details>

      {/* Prefabs */}
      <details>
        <summary>Prefabs</summary>
        No prefabs.
      </details>

      {/* Shaders */}
      <details>
        <summary>Shaders</summary>
        No shaders.
      </details>
    </div>
  )
}
