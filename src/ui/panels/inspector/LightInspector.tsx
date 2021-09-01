import React, { ReactElement } from "react"
import Panel from "../Panel"
import ComponentFieldValue from "./entity/ComponentFieldValue"

interface Props {
  selectedLight: Engine.LightProps
}

export default function LightInspector({ selectedLight }: Props): ReactElement {
  const updateColor = (val: Engine.ComponentPropType) => {
    console.debug("todo", val)
  }

  const updateIntensity = (newIntensity: number) => {
    console.debug("todo")
  }

  return (
    <Panel label="Inspector">
      <h1>{selectedLight.name}</h1>
      <section className="space-y-2">
        <div className="flex space-x-2">
          Intensity:{" "}
          <input
            type="number"
            value={selectedLight.intensity}
            onChange={(e) => updateIntensity(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          Color:{" "}
          <input
            type="color"
            value={selectedLight.color as any}
            onChange={(e) => updateColor(e.target.value)}
          />
        </div>
        {/* <div>Intensity: {selectedLight.intensity}</div>
        Color: <ComponentFieldValue
          field={[0, 0, 0]}
          updateField={updateColor}
        /> */}
      </section>
    </Panel>
  )
}
