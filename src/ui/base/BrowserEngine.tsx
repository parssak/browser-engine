import  { ReactElement } from "react"
import InspectorPanel from "../panels/inspector/InspectorPanel"
import Nav from "../panels/nav/Nav"
import EditorPanel from "../panels/editor/EditorPanel"
import ScenePanel from "../panels/scene/ScenePanel"
import HierarchyPanel from "../panels/hierarchy/HierarchyPanel"
import ProjectPanel from "../panels/project/ProjectPanel"

export default function BrowserEngine(): ReactElement {

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Nav />
      <section
        className="w-full h-full grid"
        style={{ gridTemplateColumns: "70vw 1fr 1fr" }}
      >
        <div className="h-full w-full grid relative">
          <ScenePanel />
          <EditorPanel />
          {/* <div className="absolute inset-0 bg-red-200 border-2 border-green-500"></div> */}
        </div>
        <aside className="grid grid-rows-5">
          <div className="row-span-3">
            <HierarchyPanel />
          </div>
          <div className="row-span-2">
            <ProjectPanel />
          </div>
        </aside>
        <aside className="grid">
          <InspectorPanel />
        </aside>
      </section>
    </div>
  )
}
