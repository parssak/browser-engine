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
          p-1
          rounded-sm
          transition
          cursor-pointer
          select-none
        text-white
          text-sm
          ${isSelected && "bg-gray-500"}
          ${isSelected ? "hover:bg-gray-600" : "hover:bg-gray-500"}
    `}
      onClick={handleClick}
    >
      {entity?.name ?? "__ENTITY__"}
    </div>
  )
}

export default HierarchyNode
