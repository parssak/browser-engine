/** Recursively flattens all entity props and detaches children */
export const flattenEntities = (entities: Engine.EntityProps[]): Engine.EntityProps[] => {
  const input = [...entities];
  const flattened: Engine.EntityProps[] = [];
  for (const entity of input) {
    if (entity.children.length > 0) {
      const { children } = entity;

      // entity.children = []; // TODO: Do I need to detach children to prevent cyclic ref?
      flattened.push(entity);

      // Pass all children
      const childrenEntities = flattenEntities(children);
      flattened.push(...childrenEntities);
    } else {
      flattened.push(entity);
    }
  }
  return flattened;
}

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