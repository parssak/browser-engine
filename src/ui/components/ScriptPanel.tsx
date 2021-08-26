import { ReactElement } from 'react'
import useScripts from '../../state/scripts/useScripts'

export default function ScriptPanel(): ReactElement {
  const { scripts, loadScript } = useScripts()

  return (
    <div>
      {
        scripts.map(s => (
          <div onClick={() => loadScript(s.id)}>
            {s.name}
          </div>)
        )
      }
    </div>
  )
}
