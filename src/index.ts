import { Env } from './decorators/env.decorator';
import { Key } from './decorators/key.decorator';

export { EnvOptions, Env } from './decorators/env.decorator';
export { KeyOptions, Key } from './decorators/key.decorator';
@Env({ allowNotExistInClass: true })
export class AWSConfig {
  @Key()
  static AWS_SECRET_KEY: string; // String("secret key")
}

@Env({ allowNotExistInClass: true })
export class S3Config {
  @Key()
  static S3_BUCKET: string; // String("bucket name")
}
console.log(AWSConfig);
console.log(S3Config);
