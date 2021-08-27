import { EditorProvider } from "./state/editor/EditorContext"
import { SceneProvider } from "./state/scene/SceneContext"
import { ScriptProvider } from "./state/scripts/ScriptContext"
import BrowserEngine from "./ui/base/BrowserEngine"

function App() {
  return (
    <SceneProvider>
      <ScriptProvider>
        <EditorProvider>
          <BrowserEngine />
        </EditorProvider>
      </ScriptProvider>
    </SceneProvider>
  )
}

export default App
