import Editor from "@monaco-editor/react";
import { useEffect } from "react";
import Controls from "./ui/components/Controls";
import { Resizable } from "re-resizable";
import { useRef } from "react";
import { connectContainerToScene } from "./engine/core";
import { SceneProvider } from "./state/SceneContext";
import BrowserEngine from "./ui/base/BrowserEngine";
function App() {
  const ref = useRef<any>()

  

  return (
    <SceneProvider>
      <BrowserEngine />
    </SceneProvider>
    // <main className="w-screen h-screen overflow-hidden ">
    //   <nav className="bg-gray-900 p-2"></nav>
    //   <section className="w-full h-full grid grid-cols-2 ">
    //     <div className="bg-black h-full" id="scene" ref={ref} ></div>
    //     <Resizable>
    //       <div className="h-full">
    //         <Controls />
    //         <Editor
    //           height="100%"
    //           theme="vs-dark"
    //           defaultLanguage="typescript"
    //           defaultValue="// some comment"
    //         />
    //       </div>
    //     </Resizable>
    //   </section>
    // </main>
  );
}

export default App;
