
/** Recursively flattens all entity props and detaches children */
export const flattenEntities = (entities: Engine.EntityProps[]): Engine.EntityProps[] => {
  const input = [...entities];
  const flattened: Engine.EntityProps[] = [];
  for (const entity of input) {
    if (entity.children.length > 0) {
      const { children } = entity;

      // Detach children to prevent cyclic ref
      entity.children = [];
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