import React, { ReactElement } from 'react';
import useScene from '../../state/scene/useScene';

interface Props {
  entity: Engine.EntityProps;
}

function TreeNode({ entity }: Props): ReactElement {
  const { selectedEntity, selectEntity } = useScene();
  const isSelected = selectedEntity === entity.id;
  return (
    <div className={`
    p-1
    rounded-md
    transition
    cursor-pointer
    hover:bg-red-400
    ${isSelected && 'bg-red-300'}`} onClick={() => isSelected ? selectEntity('') : selectEntity(entity.id)}>
      {entity?.name ?? '__ENTITY__'}
    </div>
  )

}

export default function TreeViewPanel(): ReactElement {
  const { sceneConfig } = useScene();

  return (
    <div className="bg-red-500 space-y-0.5">
      {
        sceneConfig.entities.map(entity =>
          <TreeNode
            key={entity.id}
            entity={entity}
          />
        )

      }
    </div>
  )
}
