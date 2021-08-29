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

  const getLanguage = () => {
    if (!selectedScript) return 'javascript';
    switch (selectedScript.language) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'glsl':
        return 'c';
      default:
        return 'cpp';
    }
  }

  return (
    <>
      {selectedScript && (
        <>
          <div className="absolute h-full w-full" key={selectedScript.id}>
            <Editor
              height="100%"
              width="100%"
              defaultLanguage={getLanguage()}
              defaultValue={selectedScript.content}
              theme="vs-dark"
              onChange={handleEditorChange}
              defaultPath="/src/modal"
            />
          </div>
        </>
      )}
    </>
  )
}
