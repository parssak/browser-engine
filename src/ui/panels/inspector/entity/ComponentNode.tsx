import { button } from "leva"
import useControlPanel from "./useControlPanel"

interface Props {
  componentType: Engine.ComponentType
  componentProps: Engine.ComponentProps
  componentScriptID: Engine.ScriptID
  updateComponent: (
    type: Engine.ComponentType,
    field: string,
    value: Engine.ComponentPropType
  ) => void
  removeComponent: () => void
}

const ComponentNode = ({
  componentType,
  componentProps,
  updateComponent,
  removeComponent,
}: Props): React.ReactElement => {
  const setComponentProps = (value: any, fieldName: string) => {
    updateComponent(componentType, fieldName, value)
  }

  useControlPanel(componentType, componentProps as any, setComponentProps, {
    "Remove Component": button(removeComponent),
  })

  return <></>
}

export default ComponentNode
