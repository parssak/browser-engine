import { ReactElement } from 'react'
import useEditor from '../../../state/editor/useEditor';
import useScene from '../../../state/scene/useScene'
import useScripts from '../../../state/scripts/useScripts';

export default function Nav(): ReactElement {
  const { createEntity, createMaterial } = useScene();
  const { toggleRun, isRunning } = useEditor();
  const { createScript, selectedScript, loadScript, saveScript, scriptBody } = useScripts();

  const handleCreateComponent = () => {
    const componentName = "NewComponent"
    createScript(componentName, "js", "component")
  }

  const handleCreateMaterial = () => {
    const materialName = "NewMaterial"
    const vShader = createScript("vertex", "glsl", "vertex");
    const fShader = createScript("fragment", "glsl", "fragment");
    createMaterial(materialName, vShader.id, fShader.id)
  }

  const handleSaveScript = () => {
    if (selectedScript) {
      saveScript({ ...selectedScript, content: scriptBody })
    }
  }

  const handleCloseScript = () => {
    loadScript("")
  }
  return (
    <div>
      <header
        className={`h-0.5 transition bg-red-600 ${isRunning && "bg-green-500"}`}
      />
      <nav className="bg-gray-900 p-2 flex w-full">
        <div className="space-x-2">
          <button onClick={toggleRun} className="primary">
            {isRunning ? "Stop" : "Run"} Scene
          </button>
          <button onClick={createEntity} className="secondary">
            Add Entity
          </button>
          <button onClick={handleCreateComponent} className="secondary">
            Add Component
          </button>
          <button onClick={handleCreateMaterial} className="secondary">
            Add Material
          </button>
        </div>
        {selectedScript && (
          <div className="space-x-2 ml-auto">
            <button className="secondary" onClick={handleCloseScript}>
              Close Editor
            </button>
            <button onClick={handleSaveScript} className="submit">
              Save script
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}
