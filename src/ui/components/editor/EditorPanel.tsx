import Editor from '@monaco-editor/react';
import { ReactElement, useEffect } from 'react'
import useScripts from '../../../state/scripts/useScripts';

export default function EditorPanel(): ReactElement {
  const { selectedScript, scriptBody, setScriptBody } = useScripts();

  useEffect(() => {
    if (!scriptBody && selectedScript) {
      setScriptBody(selectedScript.content)
    }
  }, [selectedScript])

  const handleEditorChange = (newValue: string | undefined) => {
    setScriptBody(newValue ?? "")
  }

  return (
    <>
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
    </>
  )
}
