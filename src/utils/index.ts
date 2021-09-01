export const deepClone = <T>(input: T): T => {
  return JSON.parse(JSON.stringify(input)) as T
}

const numberToHexadecimal = (value: number): Engine.Hexadecimal => {
  return parseInt(`${value}`, 16);
}

export const rgbToHexa = (r: number, g: number, b: number): Engine.Hexadecimal => {
  const hexaR = numberToHexadecimal(r)
  const hexaG = numberToHexadecimal(g)
  const hexaB = numberToHexadecimal(b)
  return parseInt(`0x${hexaR}${hexaG}${hexaB}`, 16)
}