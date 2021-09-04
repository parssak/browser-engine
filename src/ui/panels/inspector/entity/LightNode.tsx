import React, { ReactElement } from 'react'
import ComponentFieldValue from './ComponentFieldValue'

interface Props {
  lightProps: Engine.LightProps
  updateLightProps: (updated: Engine.LightProps) => void
}

export default function LightNode({ lightProps, updateLightProps }: Props): ReactElement {
  const setLightProps = (value: any, fieldName: string) => {
    const updatedLightProps = {
      ...lightProps
    } as any;
    updatedLightProps[fieldName] = value;
    updateLightProps(updatedLightProps);

  }
  return (
    <div>
      <h3>Light Inspector</h3>
      <div className="flex space-x-2">
        <p className="inspector-field-label">Intensity</p>
        <ComponentFieldValue
          field={lightProps.intensity}
          updateField={(e) => setLightProps(e, 'intensity')}
        />
      </div>
    </div>
  )
}
