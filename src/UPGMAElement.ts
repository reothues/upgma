export type Tags = string[];
export class UPGMAElement {
  name: string | number;
  tags: Tags = [];
  constructor (name: string | number, ...tags: string[]) {
    this.name = name;
    tags = tags || [];
    tags = tags.filter(tag => {
      return tag !== '' && tag !== undefined
    });

    this.tags = Array.from(new Set(tags));
  }
}
