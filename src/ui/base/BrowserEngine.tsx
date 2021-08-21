import { ReactElement } from 'react'
import useEditor from '../../state/editor/useEditor'
import useScene from '../../state/scene/useScene'
import Controls from '../components/Controls'
import TreeViewPanel from '../components/TreeViewPanel'

export default function BrowserEngine(): ReactElement {
  const { createEntity, selectedEntity } = useScene()
  const { renderElement,  toggleRun, isRunning } = useEditor()
  
  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className={`h-2 transition bg-red-200 ${isRunning && 'bg-green-200'}`}></div>
      <nav className="bg-gray-900 p-2 space-x-2">
        <button onClick={toggleRun} className="p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600">Run Scene</button>
        <button onClick={createEntity} className="p-2 bg-gray-700 rounded-md px-3 transition hover:bg-gray-600">Add Entity</button>
      </nav>
      <section className="w-full h-full grid" style={{ gridTemplateColumns: '1fr 14rem' }}>
        {renderElement && (<div className="bg-gray-600" id="scene" ref={renderElement} />)}
       <TreeViewPanel />
      </section>
      {selectedEntity && <Controls />}
    </main>
  )
}
