import Editor from '@monaco-editor/react'
import { Resizable } from 're-resizable'
import React, { ReactElement } from 'react'
import SceneManager from '../../engine/core/SceneManager'
import useScene from '../../state/useScene'
import Controls from '../components/Controls'

const defaultEditorValue = `// Welcome to Browser Engine!
// A Project by @parssak (Parssa Kyanzadeh)
//
// This is a simple example of a TypeScript file.
//
// This editor doesn't do much yet.
`

export default function BrowserEngine(): ReactElement {
  const { ref, runScene } = useScene()

  return (
    <main className="w-screen h-screen overflow-hidden ">
      <nav className="bg-gray-900 p-2">
        <button onClick={runScene} className="p-2 bg-gray-700 rounded-md transition hover:bg-gray-600">Run Scene</button>
      </nav>
      <section className="w-full h-full grid" style={{ gridTemplateColumns: 'max-content 100%' }}>
        <Resizable className="border-r-4 border-gray-700 z-20" minWidth="30vw" maxWidth="70vw" onResize={() => SceneManager?.cameraManager.HandleResize()}>
          <div className="bg-black h-full" id="scene" ref={ref} ></div>
        </Resizable>
        <div className="h-full">
          <Controls />
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="typescript"
            defaultValue={defaultEditorValue}
          />
        </div>
      </section>
    </main>
  )
}
