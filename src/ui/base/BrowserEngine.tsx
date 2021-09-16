import { ReactElement, useMemo } from "react"
import InspectorPanel from "../panels/inspector/InspectorPanel"
import Nav from "../panels/nav/Nav"
import EditorPanel from "../panels/editor/EditorPanel"
import ScenePanel from "../panels/scene/ScenePanel"
import HierarchyPanel from "../panels/hierarchy/HierarchyPanel"
import ProjectPanel from "../panels/project/ProjectPanel"
import useScene from "../../state/scene/useScene"

export default function BrowserEngine(): ReactElement {
  const { selectedEntity, selectedMaterial } = useScene()
  const selectedSomething: boolean = useMemo(
    () => !!selectedEntity || !!selectedMaterial,
    [selectedEntity, selectedMaterial]
  )

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Nav />
      <section
        className="w-full h-full grid main-wrapper"
      >
        <div className="h-full w-full grid relative">
          <ScenePanel />
          <EditorPanel />
          {/* <div className="absolute inset-0 bg-red-200 border-2 border-green-500"></div> */}
        </div>
        {selectedSomething ? (
          <aside className="grid">
            <InspectorPanel />
          </aside>
        ) : (
          <aside className="grid grid-rows-5">
            <div className="row-span-3">
              <HierarchyPanel />
            </div>
            <div className="row-span-2">
              <ProjectPanel />
            </div>
          </aside>
        )}
      </section>
    </div>
  )
}
