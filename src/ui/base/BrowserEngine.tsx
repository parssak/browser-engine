import { Resizable } from 're-resizable'
import React, { ReactElement } from 'react'
import useScene from '../../state/scene/useScene'
import Controls from '../components/Controls'
import TreeViewPanel from '../components/TreeViewPanel'


export default function BrowserEngine(): ReactElement {
  const { ref, runScene, addEntity, selectedEntity } = useScene()

  return (
    <main className="w-screen h-screen overflow-hidden">
      <nav className="bg-gray-900 p-2 space-x-2">
        <button onClick={runScene} className="p-2 bg-gray-700 rounded-md transition hover:bg-gray-600">Run Scene</button>
        <button onClick={addEntity} className="p-2 bg-gray-700 rounded-md transition hover:bg-gray-600">Add Entity</button>
      </nav>
      <section className="w-full h-full grid" style={{ gridTemplateColumns: '1fr 14rem' }}>
        <div className="bg-gray-600" id="scene" ref={ref} ></div>
        {/* <Resizable className="border-r-4 border-gray-700 z-20" minWidth="30vw" maxWidth="70vw" onResize={() => SceneManager?.cameraManager.HandleResize()}>
        </Resizable> */}
       <TreeViewPanel />
      </section>
      {selectedEntity && <Controls />}
    </main>
  )
}
