import { ReactElement, useRef } from "react"
import useScripts from "../../../state/scripts/useScripts"

interface Props {
  script: Engine.Script
}

export default function ScriptNode({ script }: Props): ReactElement {
  const { loadScript, selectedScript, updateScriptName } = useScripts()
  const ref = useRef<HTMLInputElement>(null)

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation()
    loadScript(script.id)
  }

  const handleRightClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    ref?.current?.focus();

  }

  return (
    <div
      className={`project-node
          cursor-pointer
          ${selectedScript?.id === script.id && "bg-gray-500"}
          ${
            selectedScript?.id === script.id ? "hover:bg-gray-600" : "hover:bg-gray-500"
          }`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      key={script.id}
    >
      <input
        ref={ref}
        className="bg-transparent cursor-pointer"
        type="text"
        defaultValue={script.name}
        key={script.id ?? ""}
        onBlur={(e) => updateScriptName(e.target.value, script.id)}
        // @ts-ignore
        onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      />
    </div>
  )
}
