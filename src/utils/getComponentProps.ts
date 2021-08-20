const getComponentProps = (name: Engine.ComponentType, component: any) => {
  switch (name) {
    case 'transform':
      return { position: component.position, rotation: component.rotation, scale: component.scale };
    default:
      return {};
  }
}
export default getComponentProps;