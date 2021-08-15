interface IEntity {
  inGroup: boolean;
  mesh?: THREE.Mesh;
  group?: THREE.Group;
  Start: () => void;
  Update: (time?: number) => void;
}

interface IEntityParams {
  entityParams: {
    inGroup?: boolean;
  },
  params: any
};