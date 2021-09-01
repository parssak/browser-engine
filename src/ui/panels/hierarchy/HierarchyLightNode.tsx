import React, { ReactElement, useMemo } from 'react'
import useScene from '../../../state/scene/useScene';

interface Props {
  light: Engine.LightProps
}

export default function HierarchyLightNode({
  light
}: Props): ReactElement {
  const { selectedLightID, selectLight } = useScene();

  const isSelected = useMemo(
    () => selectedLightID === light.id,
    [selectedLightID, light.id]
  )

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectLight(light.id)
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
      {light?.name ?? "__ENTITY__"}
    </div>
  )
}
