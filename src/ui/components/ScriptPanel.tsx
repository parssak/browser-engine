import { ReactElement } from 'react'
import useScripts from '../../state/scripts/useScripts'

export default function ScriptPanel(): ReactElement {
  const { scripts, loadScript } = useScripts()

  return (
    <div className="bg-indigo-400 h-full p-2">
      {
        scripts.map(s => (
          <div
            className="transition hover:bg-indigo-500 p-0.5 rounded-md font-mono text-sm"
            onClick={() => loadScript(s.id)} key={s.id}>
            {s.name}.{s.language}
          </div>)
        )
      }
    </div>
  )
}
