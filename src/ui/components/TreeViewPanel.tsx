import React, { useMemo, ReactElement, useEffect } from 'react';
import useScene from '../../state/scene/useScene';

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
    p-1
    rounded-md
    transition
    cursor-pointer
    hover:bg-red-400
    ${isSelected && 'bg-red-300'}`} onClick={handleClick}>
      <h1>{entity?.name ?? '__ENTITY__'}</h1>
      {entity.children.map(child => <TreeNode key={child.id} entity={child}/>)}
    </div>
  )

}

export default function TreeViewPanel(): ReactElement {
  const { sceneConfig, selectedEntity } = useScene();
  useEffect(() => { console.debug(selectedEntity?.name); }, [selectedEntity]);
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
