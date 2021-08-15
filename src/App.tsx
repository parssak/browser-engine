import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Leva, useControls, button } from "leva"
import Agent from './engine/entities/Agent';
import * as THREE from 'three';
import { useRef } from "react";
import { connectContainerToScene } from "./engine/core";
function App() {
  const ref = useRef<any>()
  const [agent, setAgent] = useState<any>();
  const addAgent = () => {
    const a = new Agent({
      transform: {
        position: new THREE.Vector3(10, 3, 3)
      }
    });
    setAgent(a);
  }
  useControls({ 'New Agent': button(addAgent) })
  const agentControls = useControls({ 'Position': {x: 0, y: 0, z: 0}, 'Speed': {min: 0, max: 0.1, value: 0.03} })

  useEffect(() => {
    connectContainerToScene(ref.current);
    const a = new Agent();
    setAgent(a);
  }, [ref]);

  useEffect(() => {
    if (!agent) return;
    agent.transform.position.x = agentControls.Position.x;
    agent.transform.position.y = agentControls.Position.y;
    agent.transform.position.z = agentControls.Position.z;
    agent.speed = agentControls.Speed;
  }, [agentControls]);

  return (
    <main className="w-screen h-screen">
      <nav className="bg-red-50 p-5"> nav</nav>
      <section className="w-full h-full grid grid-cols-2">
        <div className="bg-black h-full" id="scene" ref={ref} ></div>
        <div className="h-full">
          {/* <Leva fill flat titleBar={false} /> */}
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
