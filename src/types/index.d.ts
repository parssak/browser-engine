// export type ComponentType = string;
// export type ComponentProps = any;

// export interface IEntityProps {
//   id: string;
//   name?: string;
//   children?: IEntityProps[];
//   material?: THREE.Material;
//   geometry?: THREE.BufferGeometry;
//   components?: [ComponentType, ComponentProps][];
// }

// export interface ISceneConfig {
//   entities: IEntityProps[];
// }

// export interface IEntity { 
//   name: string;
//   parent: IEntity | null;
//   children: IEntity[];
//   components: Record<ComponentType, IComponent>;
//   mesh: THREE.Mesh;
// }

// export interface IComponent {
//   _entity: IEntity;
//   Update: () => void;
// }