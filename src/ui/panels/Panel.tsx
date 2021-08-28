import { ReactElement } from "react"

interface Props {
  label: string
  bodyClass?: string
  children?: ReactElement | ReactElement[] | any
}

export default function Panel({ label, bodyClass, children }: Props): ReactElement {
  return (
    <div className="bg-gray-800 p-1 h-full border border-gray-900 text-white">
      <h4 className="font-mono text-xs text-red-500 mb-1">{label}</h4>
      <div className={`${bodyClass ?? ""} space-y-1`}>{children}</div>
    </div>
  )
}
