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
  return (
    <div className="bg-gray-800 text-white p-2">
      <h3 className="mb-2">{componentType}</h3>
      <div className="space-y-2">
        {Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <p
              className="text-xs font-mono text-gray-200"
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
    </div>
  )
}

export default ComponentNode
