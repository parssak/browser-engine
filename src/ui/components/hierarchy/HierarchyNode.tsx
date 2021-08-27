import { ReactElement, useMemo } from "react"
import useScene from "../../../state/scene/useScene"

interface Props {
  entity: Engine.EntityProps
}

function HierarchyNode({ entity }: Props): ReactElement {
  const { selectedEntity, selectEntity } = useScene()

  const isSelected = useMemo(
    () => selectedEntity?.id === entity.id,
    [selectedEntity, entity.id]
  )

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectEntity(entity.id)
  }

  return (
    <div
      className={`
    p-2
    rounded-md
    transition
    cursor-pointer
    select-none
    ${isSelected ? "hover:bg-indigo-500" : "hover:bg-indigo-400"}
    ${isSelected && "bg-indigo-300"}`}
      onClick={handleClick}
    >
      <h1>{entity?.name ?? "__ENTITY__"}</h1>
    </div>
  )
}

export default HierarchyNode
