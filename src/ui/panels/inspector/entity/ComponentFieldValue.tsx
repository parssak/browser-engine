interface Props {
  field: Engine.ComponentPropType
  updateField: (field: Engine.ComponentPropType) => void
}

const ComponentFieldValue = ({ field, updateField }: Props): React.ReactElement => {
  const handleUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof field === "number") {
      updateField(Number(e.target.value))
      return
    }

    if (typeof field === "string") {
      updateField(e.target.value)
    }
  }

  if (typeof field === "number" || typeof field === "string")
    return (
      <div className="bg-gray-700 text-white px-1  w-max">
        <input
          type={typeof field === "string" ? "string" : "number"}
          value={typeof field === "number" ? field : field}
          onChange={handleUpdateField}
          className="bg-gray-700 w-16 font-mono text-xs"
        />
      </div>
    )

  if (Array.isArray(field)) return <div>array field</div>

  return (
    <div className="bg-gray-700 text-white px-2 grid grid-cols-3 gap-1">
      <pre className="text-xs p-0 m-0">
        <span className="pr-0.5 text-xs text-gray-400">x:</span>
        <input
          type={typeof field === "string" ? "string" : "number"}
          value={field.x}
          onChange={(e) =>
            updateField({
              x: Number(e.target.value),
              y: field?.y ?? 0,
              z: field?.z ?? 0,
            })
          }
          className="bg-gray-700 font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">y:</span>
        <input
          type={typeof field === "string" ? "string" : "number"}
          value={field.y}
          onChange={(e) =>
            updateField({
              x: field?.x ?? 0,
              y: Number(e.target.value),
              z: field?.z ?? 0,
            })
          }
          className="bg-gray-700 w-12 font-mono text-xs"
        />
      </pre>
      <pre className="text-xs p-0 m-0">
        <span className="pr-2 text-xs text-gray-400">z:</span>
        <input
          type={typeof field === "string" ? "string" : "number"}
          value={field.z}
          onChange={(e) =>
            updateField({
              x: field?.x ?? 0,
              y: field?.y ?? 0,
              z: Number(e.target.value),
            })
          }
          className="bg-gray-700 w-12 font-mono text-xs"
        />
      </pre>
    </div>
  )
}

export default ComponentFieldValue
