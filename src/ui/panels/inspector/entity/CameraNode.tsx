import { ReactElement } from "react"
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
