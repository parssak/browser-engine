import { ReactElement } from 'react'
import useScripts from '../../../state/scripts/useScripts'
import Panel from '../Panel'

interface Props {
  selectedMaterial: Engine.Material
}

export default function MaterialInspector({ selectedMaterial }: Props): ReactElement {
  const { loadScript } = useScripts()
  return (
    <Panel label="Inspector">
      <h1>{selectedMaterial.name}</h1>
      <section>
        Fragment shader{" "}
        <small
          className="text-xs font-light underline text-gray-400 cursor-pointer hover:text-gray-300"
          onClick={() => {
            loadScript(selectedMaterial.fragmentShaderID, "id")
          }}
        >
          Open in editor
        </small>
      </section>
      <section>
        Vertex shader{" "}
        <small
          className="text-xs font-light underline text-gray-400 cursor-pointer hover:text-gray-300"
          onClick={() => {
            loadScript(selectedMaterial.vertexShaderID, "id")
          }}
        >
          Open in editor
        </small>
      </section>
    </Panel>
  )
}
