import { config, DotenvParseOutput } from 'dotenv';
import { EnvStorage, Key } from '../storages/env.storage';
import { setDefaultValues } from '../utils/set-default-values.util';
import { killServer } from '../utils/kill-server.util';

export type EnvOptions = {
  /**
   * Tell me your `.env` file path
   * @default '.env'
   */
  path?: string;

  /**
   * If key is not exist in `.env`, show key and do `process.exit(1);`
   * @default false
   */
  allowNotExistInEnv?: boolean;

  /**
   * If key is not exist in config class, show key and do `process.exit(1);`
   * @default false
   */
  allowNotExistInClass?: boolean;
};

export function Env(options: EnvOptions = {}): ClassDecorator {
  setDefaultValues(options, {
    path: '.env',
    allowNotExistInEnv: false,
    allowNotExistInClass: false,
  });

  return (envClass: any): void => {
    const output: DotenvParseOutput = config({ path: options.path })?.parsed;
    if (!output) killServer(`Env file does not exist.`);
    const keys: Key[] = EnvStorage.find(envClass.name);
    if (!keys) killServer(`Empty env class are not allowed.`);

    keys.map((key: Key) => {
      const data: string | undefined = output[key.name];
      envClass[key.name] = key.type === Boolean ? data === 'true' : key.type(data);
      if (output[key.name] === undefined || envClass[key.name] === undefined) {
        if (key.default !== undefined) {
          envClass[key.name] = key.type(key.default);
        } else {
          if (!options.allowNotExistInEnv) return;
          killServer(`"${key.name}" is not defined in env file.`);
        }
      }
      if (key.type === Number && isNaN(envClass[key.name])) {
        killServer(`"${key.name}" is NaN.`);
      }
    });

    if (!options.allowNotExistInClass) {
      for (const index in output) {
        if (envClass[index] === undefined) {
          killServer(`"${index}" is not defined in env class.`);
        }
      }
    }
  };
}
