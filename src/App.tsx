import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Agent from './engine/entities/Agent';
import * as THREE from 'three';
import { useRef } from "react";
import { connectContainerToScene } from "./engine/core";
function App() {
  const ref = useRef<any>()

  useEffect(() => {
    connectContainerToScene(ref.current);
    new Agent();
  }, [ref]);


  return (
    <main className="w-screen h-screen">
      <nav className="bg-red-50 p-5"> nav</nav>
      <section className="w-full h-full grid grid-cols-2">
        <div className="bg-black h-full" id="scene" ref={ref} ></div>
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
