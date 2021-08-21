import React, { ReactElement } from 'react';
import useScene from '../../state/scene/useScene';

interface Props {
  entity: Engine.EntityProps;
}

function TreeNode({ entity }: Props): ReactElement {
  const { selectedEntity, selectEntity } = useScene();
  const isSelected = selectedEntity?.id === entity.id;
  return (
    <div
      className={`
    p-1
    rounded-md
    transition
    cursor-pointer
    hover:bg-red-400
    ${isSelected && 'bg-red-300'}`} onClick={() => isSelected ? selectEntity('') : selectEntity(entity.id)}>
      <h1>{entity?.name ?? '__ENTITY__'}</h1>
      {entity.children.map(child => <TreeNode key={child.id} entity={child}/>)}
    </div>
  )

}

export default function TreeViewPanel(): ReactElement {
  const { sceneConfig } = useScene();

  return (
    <div className="bg-red-500 p-1.5 space-y-1">
      <h1 className="font-medium">Hierarchy</h1>
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
