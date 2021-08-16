import Editor from '@monaco-editor/react'
import React, { ReactElement } from 'react'

const defaultEditorValue = `// Welcome to Browser Engine!
// A Project by @parssak (Parssa Kyanzadeh)
//
// This is a simple example of a TypeScript file.
//
// This editor doesn't do much yet.
`

export default function EditorPanel(): ReactElement {
  return (
    <div>
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="typescript"
        defaultValue={defaultEditorValue}
      />
    </div>
  )
}
