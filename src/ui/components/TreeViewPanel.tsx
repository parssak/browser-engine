import React, { ReactElement } from 'react'
import useScene from '../../state/useScene'


export default function TreeViewPanel(): ReactElement {

  const { config } = useScene();

  return (
    <div className="bg-red-500">
      {
        config.entities.map((entity, index) => <div key={`Entity ${index}`}>{entity?.name ?? 'Entity name'}</div>)
        
      }
    </div>
  )
}
