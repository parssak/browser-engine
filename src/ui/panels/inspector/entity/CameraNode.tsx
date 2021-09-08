import { ReactElement } from "react"
import { useControls, folder } from "leva"
import { v4 as uuidv4 } from "uuid"
interface Props {
  cameraProps: Engine.CameraProps
  updateCameraProps: (updated: Engine.CameraProps) => void
}

let changingField = ""

export default function CameraNode({
  cameraProps,
  updateCameraProps,
}: Props): ReactElement {
  useControls(() => {
    const asEntries = Object.entries(cameraProps).map(([fieldName, fieldValue]) => {
      const key = uuidv4()
      return [
        key,
        {
          value: fieldValue,
          label: fieldName,
          onEditStart: () => {
            changingField = key
          },
          onChange: (value: any) => {
            if (changingField === key) {
              setCameraProps(value, fieldName)
            }
          },
          onEditEnd: () => {
            changingField = ""
          },
        },
      ]
    })
    const actualControls = Object.fromEntries(asEntries)
    return { Camera: folder(actualControls) }
  })

  const setCameraProps = (value: any, fieldName: string) => {
    const updatedCameraProps = {
      ...cameraProps,
    } as any
    updatedCameraProps[fieldName] = value
    updateCameraProps(updatedCameraProps)
  }

  return <></>
}
