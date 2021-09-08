import { useControls, folder } from "leva"
import { v4 as uuidv4 } from "uuid"
import { useEffect } from "react"

interface Props {
  componentType: Engine.ComponentType
  componentProps: Engine.ComponentProps
  componentScriptID: Engine.ScriptID
  updateComponent: (
    type: Engine.ComponentType,
    field: string,
    value: Engine.ComponentPropType
  ) => void
}

let changingField = ""

const ComponentNode = ({
  componentType,
  componentProps,
  updateComponent,
}: Props): React.ReactElement => {
  
  useEffect(() => {
    changingField = ""
  }, [])

  useControls(() => {
    const asEntries = Object.entries(componentProps).map(([fieldName, fieldValue]) => {
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
              updateComponent(componentType, fieldName, value)
            }
          },
          onEditEnd: () => {
            changingField = ""
          },
        },
      ]
    })
    const actualControls = Object.fromEntries(asEntries)
    return { [componentType]: folder(actualControls) }
  }, [componentProps])

  return <></>
}

export default ComponentNode
