import { ReactElement } from "react"
import { useControls, folder } from "leva"
import { v4 as uuidv4 } from "uuid"
import useControlPanel from "./useControlPanel"
interface Props {
  cameraProps: Engine.CameraProps
  updateCameraProps: (updated: Engine.CameraProps) => void
}

export default function CameraNode({
  cameraProps,
  updateCameraProps,
}: Props): ReactElement {

  const setCameraProps = (value: any, fieldName: string) => {
    const updatedCameraProps = {
      ...cameraProps,
    } as any
    updatedCameraProps[fieldName] = value
    updateCameraProps(updatedCameraProps)
  }

  useControlPanel('Camera', cameraProps as any, setCameraProps);
  
  return <></>
}
