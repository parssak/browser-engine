import React, { ReactElement } from 'react';
import useScene from '../../state/useScene';
import * as ENGINE from '../../types';

interface Props {
  entity: ENGINE.IEntityProps;
  isSelected: boolean;
  onClick: () => void;
}
function TreeNode({ entity, isSelected = false, onClick }: Props): ReactElement {
  return (
    <div className={`p-1 rounded-md transition cursor-pointer hover:bg-red-400 ${isSelected && 'bg-red-300'}`} onClick={onClick}>
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
            isSelected={selectedEntity === entity.id}
            entity={entity}
            onClick={() => setSelectedEntity(entity.id)}
          />
        )

      }
    </div>
  )
}
