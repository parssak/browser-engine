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
}

const ComponentNode = ({
  componentType,
  componentProps,
  updateComponent,
}: Props): React.ReactElement => {

  const setComponentProps = (value: any, fieldName: string) => {
    updateComponent(componentType, fieldName, value)
  }

  useControlPanel(componentType, componentProps as any, setComponentProps)
  
  return <></>
}

export default ComponentNode
