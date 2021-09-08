import { folder, useControls } from "leva";
import { v4 as uuidv4 } from "uuid"

let changingField = "";

const useControlPanel = (folderName: string, props: Record<string, unknown>, changeProps: (value: any, fieldName: string) => void) => {
  useControls(() => {
    const asEntries = Object.entries(props).map(([fieldName, fieldValue]) => {
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
              changeProps(value, fieldName)
            }
          },
          onEditEnd: () => {
            changingField = ""
          },
        },
      ]
    })
    const actualControls = Object.fromEntries(asEntries)
    return { [folderName]: folder(actualControls) }
  });
}

export default useControlPanel;