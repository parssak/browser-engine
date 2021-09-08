import { ReactElement } from "react"
import useControlPanel from "./useControlPanel"

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
  useControlPanel('Light', lightProps as any, setLightProps)
  return <></>
}
