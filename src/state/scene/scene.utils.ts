/** Takes all values from controls and converts it into an EntityProps-friendly component object */
export const generateComponentObjectFromValues = (values: Record<Engine.CombinedComponentPropName, Engine.ComponentPropType>): Record<Engine.ComponentType, Engine.ComponentProps> => {
  const componentObject: Record<Engine.ComponentType, Engine.ComponentProps> = {};
  Object.entries(values).forEach(entry => {
    const [type, prop]: [Engine.CombinedComponentPropName, Engine.ComponentPropType] = entry as any;
    // @ts-ignore
    const [typeName, propFieldName]: [Engine.ComponentType, string] = type.split('--');
    if (componentObject[typeName]) {
      componentObject[typeName][propFieldName] = prop;
    } else {
      componentObject[typeName] = { [propFieldName]: prop };
    }
  })
  return componentObject as Record<Engine.ComponentType, Engine.ComponentProps>;
}