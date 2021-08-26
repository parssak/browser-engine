import React, { ReactElement, useState } from 'react'
import useEditor from '../../state/editor/useEditor'
import useScene from '../../state/scene/useScene'
import useScripts from '../../state/scripts/useScripts'
import Controls from '../components/Controls'
import TreeViewPanel from '../components/TreeViewPanel'
import Editor from "@monaco-editor/react";
import ScriptPanel from '../components/ScriptPanel'

export default function BrowserEngine(): ReactElement {
  const { createEntity, selectedEntity } = useScene()
  const { renderElement, toggleRun, isRunning, handleClickScene } = useEditor()
  const { createScript, demoCompile, selectedScript } = useScripts();
  
  const handleEditorChange = (newValue: string | undefined) => {
    console.debug(newValue)
  }

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className={`h-0.5 transition bg-red-600 ${isRunning && 'bg-green-500'}`}></div>
      <nav className="bg-gray-900 p-2 space-x-2">
        <button onClick={toggleRun} className="primary">{isRunning ? 'Stop' : 'Run'} Scene</button>
        <button onClick={createEntity} className="secondary">Add Entity</button>
        <button onClick={() => createScript('foo')} className="secondary">Add Script</button>
        <button onClick={demoCompile} className="secondary">Compile Scripts</button>
      </nav>
      <section className="w-full h-full grid" style={{ gridTemplateColumns: '1fr 17rem' }}>
        {renderElement && (<div className="bg-gray-600" id="scene" ref={renderElement} onClick={(e) => handleClickScene(e)} />)}
        <div className="grid grid-rows-5 gap-0 5">
          <TreeViewPanel />
          <div className="row-span-2">
            <Controls />
          </div>
          <div className="row-span-2">
            <ScriptPanel />
          </div>
        </div>
      </section>
      {selectedScript && (<section className="fixed inset-0 grid place-items-center">
        <div className="bg-black monaco-editor" style={{ width: '60vw' }}>
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue={selectedScript.content}
            theme="vs-dark"
            onChange={handleEditorChange} />
        </div>
      </section>)}
    </main>
  )
}
