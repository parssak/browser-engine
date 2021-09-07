import useScripts from "../../../../state/scripts/useScripts"
import { Leva, useControls, folder } from "leva"
import { v4 as uuidv4 } from "uuid"

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


let changingField = "";

const ComponentNode = ({
  componentType,
  componentProps,
  updateComponent,
}: Props): React.ReactElement => {
    
  useControls(() => {
    console.log('setting controls>>')
    const asEntries = Object.entries(componentProps).map(([fieldName, fieldValue]) => {
      const key = uuidv4();
      return [
        key,
        {
          value: fieldValue,
          label: fieldName,
          onEditStart: () => {
            changingField = key;
          },
          onChange: (value: any) => {
            if (changingField === key) {
              updateComponent(componentType, fieldName, value);
            }
          },
          onEditEnd: () => {
            changingField = "";
          },
        },
      ]
    })
    const actualControls = Object.fromEntries(asEntries);
    return {[componentType]: folder(actualControls)}
  })
  
  const { loadScript } = useScripts()

  return (
    <div className="bg-gray-800 text-white pb-4">
      <div className="flex w-full justify-between items-center mb-2">
        <h3>{componentType}</h3>
        {componentType !== "Transform" && (
          <small
            className="text-xs font-light underline text-gray-400 cursor-pointer hover:text-gray-300"
            onClick={() => {
              loadScript(componentType, "name")
            }}
          >
            Open in editor
          </small>
        )}
      </div>
      <Leva fill flat titleBar={false} />
      <div className="space-y-2">
        {/* {Object.entries(componentProps).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="flex space-x-2">
            <ComponentFieldValue
              field={fieldValue}
              fieldName={fieldName}
              updateField={(e) => updateComponent(componentType, fieldName, e)}
            />
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default ComponentNode
