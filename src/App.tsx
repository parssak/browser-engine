import Editor from "@monaco-editor/react";

function App() {
  return (
    <div className="bg-black h-screen">
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
