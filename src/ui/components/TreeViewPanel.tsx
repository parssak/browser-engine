import React, { useMemo, ReactElement } from 'react';
import useScene from '../../state/scene/useScene';

// TODO: Render children
interface Props {
  entity: Engine.EntityProps;
}

function TreeNode({ entity }: Props): ReactElement {
  const { selectedEntity, selectEntity } = useScene();

  const isSelected = useMemo(() => selectedEntity?.id === entity.id, [selectedEntity, entity.id]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectEntity(entity.id);
  }

  return (
    <div
      className={`
    p-2
    rounded-md
    transition
    cursor-pointer
    select-none
    ${isSelected ? 'hover:bg-indigo-500' : 'hover:bg-indigo-400'}
    ${isSelected && 'bg-indigo-300'}`} onClick={handleClick}>
      <h1>{entity?.name ?? '__ENTITY__'}</h1>
      {/* {entity.children.map(child => <TreeNode key={child.id} entity={child}/>)} */}
    </div>
  )

}

export default function TreeViewPanel(): ReactElement {
  const { sceneConfig } = useScene();
  return (
    <div className="bg-indigo-200 p-1.5 space-y-1">
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
