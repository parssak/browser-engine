import React, { ReactElement, useEffect, useState } from "react"
import useEditor from "../../state/editor/useEditor"
import InspectorPanel from "../components/inspector/InspectorPanel"
import Nav from "../components/nav/Nav"
import EditorPanel from "../components/editor/EditorPanel"
import Hierarchy from "../components/hierarchy/Hierarchy"
import ProjectPanel from "../components/project/ProjectPanel"
import Editor from "@monaco-editor/react"

export default function BrowserEngine(): ReactElement {
  const { renderElement, toggleRun, isRunning, handleClickScene } = useEditor()
  // const { createScript, selectedScript, loadScript, saveScript } = useScripts()
  // const [scriptBody, setScriptBody] = useState(selectedScript?.content ?? "")

  // useEffect(() => {
  //   if (!scriptBody && selectedScript) {
  //     setScriptBody(selectedScript.content)
  //   }
  // }, [selectedScript])

  // const handleEditorChange = (newValue: string | undefined) => {
  //   setScriptBody(newValue ?? "")
  // }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Nav />
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
          <EditorPanel />
        </div>
        <aside className="grid grid-rows-5 gap-0 5">
          <Hierarchy />
          <div className="row-span-2">
            <InspectorPanel />
          </div>
          <div className="row-span-2">
            <ProjectPanel />
          </div>
        </aside>
      </section>
    </div>
  )
}
