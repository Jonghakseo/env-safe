import 'reflect-metadata';
import { EnvStorage } from '../storages/env.storage';
import { setDefaultValues } from '../utils/set-default-values.util';

export type KeyOptions = {
  /**
   * Default value
   * @default undefined
   */
  default?: any;

  /**
   * Description of the field
   * @default undefined
   */
  description?: string;
};

export function Key(options: KeyOptions = {}): PropertyDecorator {
  setDefaultValues(options, {
    default: undefined,
    description: undefined,
  });

  return (object: { name: string }, propertyName: string): void => {
    EnvStorage.add(object.name, {
      name: propertyName,
      type: Reflect.getMetadata('design:type', object, propertyName),
      default: options.default,
    });
  };
}
