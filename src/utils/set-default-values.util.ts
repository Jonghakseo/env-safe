export function setDefaultValues<T>(target: T, ...sources: T[]): T {
  sources.map((source: any) => {
    Object.keys(source).map((key: string) => {
      if (target[key] === undefined && source[key] !== undefined) target[key] = source[key];
    });
  });
  return target;
}
