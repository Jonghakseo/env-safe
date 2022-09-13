type EnvClassName = string;
export type Key = { name: string; type: (value: any) => any; default?: any };

export class EnvStorage {
  private static definitions: Map<EnvClassName, Key[]> = new Map<EnvClassName, Key[]>();

  static add(envClassName: EnvClassName, key: Key): void {
    if (!this.definitions.has(envClassName)) this.definitions.set(envClassName, []);
    const keyGroup: Key[] = this.definitions.get(envClassName);
    keyGroup.push(key);
  }

  static find(envClassName: EnvClassName): Key[] {
    return this.definitions.get(envClassName);
  }
}
