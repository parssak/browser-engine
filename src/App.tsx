import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function App() {
  return (
    <div className="App">
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="typescript"
        defaultValue="// some comment"
      />
    </div>
  );
}

export default App;
