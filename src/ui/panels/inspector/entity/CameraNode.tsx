import { Color } from "three"
import { ReactElement } from "react"
import ComponentFieldValue from "./ComponentFieldValue"

interface Props {
  cameraProps: Engine.CameraProps
  updateCameraProps: (updated: Engine.CameraProps) => void
}

export default function CameraNode({ cameraProps, updateCameraProps }: Props): ReactElement {
  const setCameraProps = (value: any, fieldName: string) => {
    const updatedCameraProps = {
      ...cameraProps,
    } as any
    updatedCameraProps[fieldName] = value
    updateCameraProps(updatedCameraProps)
  }

  return (
    <>
      <h3>Light</h3>
      <div className="space-y-2 pt-2">
        <section className="flex space-x-2">
          <p className="inspector-field-label">Far</p>
          <ComponentFieldValue
            field={cameraProps.far}
            updateField={(e) => setCameraProps(e, "far")}
          />
        </section>
        <section className="flex space-x-2">
          <p className="inspector-field-label">Near</p>
          <ComponentFieldValue
            field={cameraProps.near}
            updateField={(e) => setCameraProps(e, "near")}
          />
        </section>
        <section className="flex space-x-2">
          <p className="inspector-field-label">Fov</p>
          <ComponentFieldValue
            field={cameraProps.fov}
            updateField={(e) => setCameraProps(e, "fov")}
          />
        </section>
        
      </div>
    </>
  )
}
