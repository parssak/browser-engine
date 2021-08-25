import React, { ReactElement } from 'react'
import useEditor from '../../state/editor/useEditor'
import useScene from '../../state/scene/useScene'
import Controls from '../components/Controls'
import TreeViewPanel from '../components/TreeViewPanel'

export default function BrowserEngine(): ReactElement {
  const { createEntity, selectedEntity } = useScene()
  const { renderElement, toggleRun, isRunning, handleClickScene } = useEditor()

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className={`h-2 transition bg-red-600 ${isRunning && 'bg-green-500'}`}></div>
      <nav className="bg-gray-900 p-2 space-x-2">
        <button onClick={toggleRun} className="primary">{isRunning ? 'Stop' : 'Run'} Scene</button>
        <button onClick={createEntity} className="secondary">Add Entity</button>
      </nav>
      <section className="w-full h-full grid" style={{ gridTemplateColumns: '1fr 17rem' }}>
        {renderElement && (<div className="bg-gray-600" id="scene" ref={renderElement} onClick={(e) => handleClickScene(e)} />)}
        <div className="grid grid-rows-3 gap-0 5">
          <TreeViewPanel />
          <div className="row-span-2">
            <Controls key={selectedEntity?.id ?? 'controls'} />
          </div>
        </div>
      </section>
    </main>
  )
}
