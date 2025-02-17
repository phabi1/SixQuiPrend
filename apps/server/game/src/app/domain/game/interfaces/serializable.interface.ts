export interface Serializable {
  serialize(): any;
  unserialize(data: any): void;
}
