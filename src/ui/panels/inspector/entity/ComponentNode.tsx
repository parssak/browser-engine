import { button } from "leva"
import useScripts from "../../../../state/scripts/useScripts"
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
  componentScriptID,
  updateComponent,
  removeComponent,
}: Props): React.ReactElement => {

  const { loadScript } = useScripts()
  const setComponentProps = (value: any, fieldName: string) => {
    updateComponent(componentType, fieldName, value)
  }

  useControlPanel(
    componentType,
    componentProps as any,
    setComponentProps,
    componentType !== "Transform"
      ? {
        "Open File": button(() => loadScript(componentType, 'name')),
          "Remove Component": button(removeComponent),
        }
      : undefined
  )

  return <></>
}

export default ComponentNode
