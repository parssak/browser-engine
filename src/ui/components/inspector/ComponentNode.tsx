import useScripts from "../../../state/scripts/useScripts"
import ComponentFieldValue from "./ComponentFieldValue"

interface Props {
  componentType: Engine.ComponentType
  componentProps: Engine.ComponentProps
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
  const { loadScript } = useScripts()
  return (
    <div
      className="bg-gray-800 text-white pb-4"
      onClick={() => {
        loadScript(componentType)
      }}
    >
      <h3 className="mb-2">{componentType}</h3>
      <div className="space-y-2">
        {Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <p
              className="text-xs capitalize text-gray-200"
              style={{ minWidth: "10ch" }}
            >
              {fieldName}
            </p>
            <ComponentFieldValue
              field={fieldValue}
              updateField={(e) => updateComponent(componentType, fieldName, e)}
            />
          </div>
        ))}
      </div>
      <hr className="mt-4" />
    </div>
  )
}

export default ComponentNode
