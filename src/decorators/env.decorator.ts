import { config, DotenvParseOutput } from 'dotenv';
import { EnvStorage, Key } from '../storages/env.storage';
import { setDefaultValues } from '../utils/set-default-values.util';
import { killServer } from '../utils/kill-server.util';

export type EnvOptions = {
  /**
   * Input your `.env` file path
   * @default '.env'
   */
  path?: string;
};

export function Env(options: EnvOptions = {}): ClassDecorator {
  setDefaultValues(options, { path: '.env' });

  return (envClass: any): void => {
    const output: DotenvParseOutput = config({ path: options.path })?.parsed;
    if (!output) killServer(`Env file does not exist.`);
    const keys: Key[] = EnvStorage.find(envClass.name);
    if (!keys) killServer(`Empty env class are not allowed.`);

    keys.map((key: Key) => {
      const data: string | undefined = output[key.name];
      envClass[key.name] = key.type === Boolean ? data === 'true' : key.type(data);
      if (output[key.name] === undefined || envClass[key.name] === undefined) {
        if (key.default !== undefined) envClass[key.name] = key.type(key.default);
      }
      if (key.type === Number && isNaN(envClass[key.name])) {
        killServer(`"${key.name}" is NaN.`);
      }
    });

    for (const index in output) {
      if (envClass[index] === undefined) killServer(`"${index}" is not defined in env class.`);
    }
  };
}
