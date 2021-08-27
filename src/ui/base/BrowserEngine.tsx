import React, { ReactElement, useEffect, useState } from "react"
import useEditor from "../../state/editor/useEditor"
import useScene from "../../state/scene/useScene"
import useScripts from "../../state/scripts/useScripts"
import InspectorPanel from "../components/inspector/InspectorPanel"
import TreeViewPanel from "../components/TreeViewPanel"
import Editor from "@monaco-editor/react"
import ScriptPanel from "../components/ScriptPanel"

export default function BrowserEngine(): ReactElement {
  const { createEntity, selectedEntity } = useScene()
  const { renderElement, toggleRun, isRunning, handleClickScene } = useEditor()
  const { createScript, selectedScript, loadScript, saveScript } = useScripts()

  const [scriptBody, setScriptBody] = useState(selectedScript?.content ?? "")

  useEffect(() => {
    if (!scriptBody && selectedScript) {
      setScriptBody(selectedScript.content)
    }
  }, [selectedScript])

  const handleEditorChange = (newValue: string | undefined) => {
    setScriptBody(newValue ?? "")
  }

  const handleCreateScript = () => {
    createScript("Component")
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
    <main className="w-screen h-screen overflow-hidden">
      <div
        className={`h-0.5 transition bg-red-600 ${isRunning && "bg-green-500"}`}
      ></div>
      <nav className="bg-gray-900 p-2 flex w-full">
        <div className="space-x-2">
          <button onClick={toggleRun} className="primary">
            {isRunning ? "Stop" : "Run"} Scene
          </button>
          <button onClick={createEntity} className="secondary">
            Add Entity
          </button>
          <button onClick={handleCreateScript} className="secondary">
            Add Script
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
      <section
        className="w-full h-full grid"
        style={{ gridTemplateColumns: "1fr 17rem" }}
      >
        <div className="h-full w-full grid relative">
          {renderElement && (
            <div
              className="bg-gray-600"
              id="scene"
              ref={renderElement}
              onClick={(e) => handleClickScene(e)}
            />
          )}
          {selectedScript && (
            <>
              <div className="absolute h-full w-full" key={selectedScript.id}>
                <Editor
                  height="100%"
                  width="100%"
                  defaultLanguage="javascript"
                  defaultValue={selectedScript.content}
                  theme="vs-dark"
                  onChange={handleEditorChange}
                />
              </div>
            </>
          )}
        </div>
        <div className="grid grid-rows-5 gap-0 5">
          <TreeViewPanel />
          <div className="row-span-2">
            <InspectorPanel />
          </div>
          <div className="row-span-2">
            <ScriptPanel />
          </div>
        </div>
      </section>
      {/* {selectedScript && (<section className="fixed inset-0 grid place-items-center" onClick={() => loadScript('')}>
        <div
          onClick={e => {
            e.stopPropagation();
            saveScript({ ...selectedScript, content: scriptBody });
          }}
          className="absolute top-10 right-10 py-2 px-4 cursor-pointer rounded-md bg-green-600 text-white">
          Save
        </div>
        <div className="bg-black monaco-editor" style={{ width: '60vw' }} onClick={e => e.stopPropagation()}>
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue={selectedScript.content}
            theme="vs-dark"
            onChange={handleEditorChange} />
        </div>
      </section>)} */}
    </main>
  )
}
