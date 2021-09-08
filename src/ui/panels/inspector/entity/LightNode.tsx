import { ReactElement } from "react"
import { folder, useControls } from "leva"
import { v4 as uuidv4 } from "uuid"
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
  // useControls(() => {
  //   const asEntries = Object.entries(lightProps).map(([fieldName, fieldValue]) => {
  //     const key = uuidv4()
  //     return [
  //       key,
  //       {
  //         value: fieldValue,
  //         label: fieldName,
  //         onEditStart: () => {
  //           changingField = key
  //         },
  //         onChange: (value: any) => {
  //           if (changingField === key) {
  //             setLightProps(value, fieldName)
  //           }
  //         },
  //         onEditEnd: () => {
  //           changingField = ""
  //         },
  //       },
  //     ]
  //   })
  //   const actualControls = Object.fromEntries(asEntries)
  //   return { Light: folder(actualControls) }
  // })

  return <></>
}
