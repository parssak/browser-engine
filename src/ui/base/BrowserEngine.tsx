import  { ReactElement } from "react"
import InspectorPanel from "../components/inspector/InspectorPanel"
import Nav from "../components/nav/Nav"
import EditorPanel from "../components/editor/EditorPanel"
import ScenePanel from "../components/scene/ScenePanel"
import HierarchyPanel from "../components/hierarchy/HierarchyPanel"
import ProjectPanel from "../components/project/ProjectPanel"

export default function BrowserEngine(): ReactElement {

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Nav />
      <section
        className="w-full h-full grid"
        style={{ gridTemplateColumns: "1fr 14rem 14rem" }}
      >
        <div className="h-full w-full grid relative">
          <ScenePanel />
          <EditorPanel />
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
