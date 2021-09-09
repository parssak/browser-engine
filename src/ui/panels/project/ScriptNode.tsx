import { ReactElement } from "react"
import useScripts from "../../../state/scripts/useScripts"

interface Props {
  script: Engine.Script
}

export default function ScriptNode({ script }: Props): ReactElement {
  const { loadScript, selectedScript, updateScriptName } = useScripts()

  const handleClick = () => {
    loadScript(script.id)
  }

  const handleRightClick = () => {
    
  }

  return (
    <div
      className={`project-node
          ${selectedScript?.id === script.id && "bg-gray-500"}
          ${
            selectedScript?.id === script.id ? "hover:bg-gray-600" : "hover:bg-gray-500"
          }`}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      key={script.id}
    >
      <input
        className="transition bg-gray-800 hover:bg-gray-700 focus:bg-gray-900"
        type="text"
        defaultValue={script.name}
        key={script.id ?? ""}
        onBlur={(e) => updateScriptName(e.target.value, script.id)}
        // @ts-ignore
        onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      />
      {/* {script.name}.{script.language} */}
    </div>
  )
}
