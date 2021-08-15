import { useControls } from 'leva'

export default function Controls({}) {
  const { myValue } = useControls({ myValue: 10 })
  return myValue
}
