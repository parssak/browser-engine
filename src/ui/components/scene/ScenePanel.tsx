import { ReactElement } from 'react'
import useEditor from '../../../state/editor/useEditor'

export default function ScenePanel(): ReactElement {
  const { renderElement, handleClickScene } = useEditor()
  
  return (
    <>
      {renderElement && (
        <div
          id="scene"
          ref={renderElement}
          onClick={(e) => handleClickScene(e)}
        />
      )}
    </>
  )
}
