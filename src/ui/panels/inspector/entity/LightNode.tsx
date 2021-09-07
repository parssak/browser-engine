import { Color } from "three"
import { ReactElement } from "react"
import ComponentFieldValue from "./ComponentFieldValue"

interface Props {
  lightProps: Engine.LightProps
  updateLightProps: (updated: Engine.LightProps) => void
}

export default function LightNode({ lightProps, updateLightProps }: Props): ReactElement {
  const setLightProps = (value: any, fieldName: string) => {
    const updatedLightProps = {
      ...lightProps,
    } as any
    updatedLightProps[fieldName] = value
    updateLightProps(updatedLightProps)
  }

  const colorToHexString = (color: string) => {
    return `#${new Color(lightProps.color).getHexString()}`
  }

  return (
    <>
      <h3>Light</h3>
      <div className="space-y-2 pt-2">
        <section className="flex space-x-2">
          <p className="inspector-field-label">Intensity</p>
          <ComponentFieldValue
            field={lightProps.intensity}
            fieldName={'intensity'}
            updateField={(e) => setLightProps(e, "intensity")}
          />
        </section>
        <section className="flex space-x-2">
          <p className="inspector-field-label">Color</p>
          <input
            type="color"
            value={colorToHexString(lightProps.color as string)}
            onChange={(e) => setLightProps(e.target.value, "color")}
          />
        </section>
      </div>
    </>
  )
}
