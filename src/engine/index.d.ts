type ComponentType = string;
type ComponentProps = any;

interface IEntityProps {
  name?: string;
  children?: IEntityProps[];
  material?: Material;
  geometry?: Geometry;
  components?: [ComponentType, ComponentProps][];
}

interface ISceneConfig {
  entities: IEntityProps[];
}

interface IEntity { 
  name: string;
  parent: IEntity | null;
  children: IEntity[];
  components: Record<ComponentType, IComponent>;
  mesh: THREE.Mesh;
}

interface IComponent {
  _entity: Entity;
  Update: () => void;
}



// interface IEntity implements THREE.Object3D{
//   inGroup: boolean;
//   mesh?: THREE.Mesh;
//   group?: THREE.Group;
//   Update: (time?: number) => void;
//   GetProps: () => [string, any][];
// }

// interface IEntityParams {
//   entityParams?: {
//     inGroup?: boolean;
//   },
// };

// enum Component {
//   Transform = 'transform'
// };