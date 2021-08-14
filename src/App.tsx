import Editor from "@monaco-editor/react";

function App() {
  return (
    <main className="w-screen h-screen">
      <nav className="bg-red-50 p-5"> nav</nav>
      <section className="w-full h-full grid grid-cols-2">
        <div className="bg-blue-300 h-full"></div>
        <div className="bg-red-300 h-full">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="typescript"
            defaultValue="// some comment"
          />
        </div>
      </section>
      
    </main>
  );
}

export default App;
