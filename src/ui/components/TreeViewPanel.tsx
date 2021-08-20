import React, { ReactElement } from 'react';
import useScene from '../../state/scene/useScene';

interface Props {
  entity: Engine.EntityProps;
}

function TreeNode({ entity }: Props): ReactElement {
  const { config, selectedEntity, setSelectedEntity } = useScene();
  const isSelected = selectedEntity === entity.id;
  return (
    <div className={`
    p-1
    rounded-md
    transition
    cursor-pointer
    hover:bg-red-400
    ${isSelected && 'bg-red-300'}`} onClick={() => isSelected ? setSelectedEntity(null) : setSelectedEntity(entity.id)}>
      {entity?.name ?? '__ENTITY__'}
    </div>
  )

}

export default function TreeViewPanel(): ReactElement {
  const { config, selectedEntity, setSelectedEntity } = useScene();

  return (
    <div className="bg-red-500 space-y-0.5">
      {
        config.entities.map(entity =>
          <TreeNode
            key={entity.id}
            entity={entity}
          />
        )

      }
    </div>
  )
}
