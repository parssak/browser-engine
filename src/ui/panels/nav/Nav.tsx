import { ReactElement } from "react"
import useEditor from "../../../state/editor/useEditor"
import useScene from "../../../state/scene/useScene"
import useScripts from "../../../state/scripts/useScripts"
import { generateNewEntity, generateNewLight } from "../../../utils/entity.utils"

export default function Nav(): ReactElement {
  const { createEntity,  createMaterial } = useScene()
  const { toggleRun, isRunning, saveScene, exportScene } = useEditor(true)
  const { createScript, selectedScript, loadScript, saveScript, scriptBody } =
    useScripts()

  const handleCreateComponent = () => {
    const componentName = "NewComponent"
    createScript([{ name: componentName, language: "js", type: "component" }])
  }

  const handleCreateMaterial = () => {
    const materialName = "NewMaterial"
    const [vShader, fShader] = createScript([
      {
        name: "vertex",
        language: "glsl",
        type: "vertex",
      },
      {
        name: "fragment",
        language: "glsl",
        type: "fragment",
      },
    ])
    createMaterial(materialName, vShader.id, fShader.id)
  }

  const handleCreateEntity = () => {
    const newEntity: Engine.EntityProps = generateNewEntity()
    createEntity(newEntity);
  }

  const handleCreateLight = () => {
    const newLight: Engine.EntityProps = generateNewLight()
    createEntity(newLight)
  }

  const handleSaveScene = () => {
    saveScene();
  }

  const handleSaveScript = () => {
    if (selectedScript) {
      saveScript({ ...selectedScript, content: scriptBody })
    }
  }

  const handleCloseScript = () => {
    loadScript("")
  }

  const handleExportScene = () => {
    exportScene();
  }
  
  return (
    <div>
      <header className={`h-0.5 transition bg-red-600 ${isRunning && "bg-green-500"}`} />
      <nav className="bg-gray-900 p-2 flex w-full shadow-sm">
        <div className="space-x-2">
          <button onClick={toggleRun} className="primary">
            {isRunning ? "Stop" : "Run"} Scene
          </button>
          <button onClick={handleCreateEntity} className="secondary">
            Add Entity
          </button>
          <button onClick={handleCreateLight} className="secondary">
            Add Light
          </button>
          <button onClick={handleCreateComponent} className="secondary">
            Add Component
          </button>
          <button onClick={handleCreateMaterial} className="secondary">
            Add Material
          </button>
          {/* save scene button */}
          <button onClick={handleSaveScene} className="secondary">
            Save Scene
          </button>
          {/* <button onClick={handleExportScene} className="secondary">
            Export Scene
          </button> */}
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
