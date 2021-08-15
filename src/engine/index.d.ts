interface IEntity implements THREE.Object3D{
  inGroup: boolean;
  mesh?: THREE.Mesh;
  group?: THREE.Group;
  Update: (time?: number) => void;
  GetProps: () => [string, any][];
}

interface IEntityParams {
  entityParams?: {
    inGroup?: boolean;
  },
};

enum Component {
  Transform = 'transform'
};