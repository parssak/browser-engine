import { EditorProvider } from "./state/editor/EditorContext"
import { SceneProvider } from "./state/scene/SceneContext"
import { ScriptProvider } from "./state/scripts/ScriptContext"
import BrowserEngine from "./ui/base/BrowserEngine"

function App() {
  return (
    <ScriptProvider>
      <SceneProvider>
        <EditorProvider>
          <BrowserEngine />
        </EditorProvider>
      </SceneProvider>
    </ScriptProvider>
  )
}

export default App
