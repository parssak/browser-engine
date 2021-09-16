import { ReactElement, useMemo } from "react"
import useScene from "../../../state/scene/useScene"

interface Props {
  entity: Engine.EntityProps
  parent: Engine.EntityID | null
}

function HierarchyNode({ entity, parent }: Props): ReactElement {
  const { selectedEntity, selectEntity, sceneConfig } = useScene()

  const isSelected = useMemo(
    () => selectedEntity?.id === entity.id,
    [selectedEntity, entity.id]
  )

  const isHidden = useMemo(() => !entity.visible, [entity])

  const childrenProps = useMemo(() => {
    if (entity.children.length <= 0) return []
    const getEntityByID = (id: Engine.EntityID) =>
      sceneConfig.entities.find((e) => e.id === id)
    return entity.children.map((childID) => getEntityByID(childID))
  }, [entity, sceneConfig])

  if (entity.parent !== parent) return <></>

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectEntity(entity.id)
  }

  return (
    <div
      className={`
          p-1
          rounded-sm
          transition
          cursor-pointer
          select-none
        text-white
          text-sm
          ${isSelected && "bg-gray-500"}
          ${isSelected ? "hover:bg-gray-600" : "hover:bg-gray-500"}
          ${isHidden && "opacity-50"}

    `}
      onMouseDown={handleClick}
    >
      {entity.name ?? "__ENTITY__"}
      {childrenProps.map(
        (child) =>
          child && <HierarchyNode key={child.id} entity={child} parent={entity.id} />
      )}
    </div>
  )
}

export default HierarchyNode
