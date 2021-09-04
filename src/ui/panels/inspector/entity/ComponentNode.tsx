import useScripts from "../../../../state/scripts/useScripts"
import ComponentFieldValue from "./ComponentFieldValue"

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
  const { loadScript } = useScripts()
  return (
    <div className="bg-gray-800 text-white pb-4">
      <div className="flex w-full justify-between items-center mb-2">
        <h3>{componentType}</h3>
        {componentType !== "Transform" && (
          <small
            className="text-xs font-light underline text-gray-400 cursor-pointer hover:text-gray-300"
            onClick={() => {
              loadScript(componentType)
            }}
          >
            Open in editor
          </small>
        )}
      </div>
      <div className="space-y-2">
        {Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <p className="inspector-field-label">{fieldName}</p>
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
