import React, { ReactElement } from 'react'
import useScripts from '../../../state/scripts/useScripts'

interface Props {
  
}

export default function ProjectPanel(): ReactElement {
  const { scripts, loadScript } = useScripts()
  return (
    <div className="bg-indigo-800 p-1 text-gray-300">
      <h3>Project</h3>

      {/* Scripts */}
      <details>
        <summary>Scripts</summary>
        {scripts.map((s) => (
          <div
            className="transition hover:bg-indigo-500 p-0.5 rounded-md font-mono text-sm"
            onClick={() => loadScript(s.id)}
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
