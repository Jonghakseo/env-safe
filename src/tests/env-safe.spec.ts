import { EnvSafe, EnvKey } from '../index';

@EnvSafe()
class ENV1 {
  @EnvKey()
  static DATABASE_USER: string;

  @EnvKey()
  static DATABASE_PORT: number;

  @EnvKey()
  static DATABASE_SYNC: boolean;
}

@EnvSafe({ path: 'src/tests/env/redis.env' })
class ENV2 {
  @EnvKey()
  static DATABASE_USER: string;

  @EnvKey()
  static DATABASE_PORT: number;

  @EnvKey()
  static DATABASE_SYNC: boolean;

  @EnvKey()
  static DATABASE_DROP: boolean;
}

@EnvSafe()
class ENV3 {
  @EnvKey()
  static DATABASE_USER: string;

  @EnvKey()
  static DATABASE_PORT: number;

  @EnvKey()
  static DATABASE_SYNC: boolean;

  @EnvKey({ default: 'howdy' })
  static RELEASE: string;

  @EnvKey({ default: 2022 })
  static VERSION: number;

  @EnvKey({ default: true })
  static CONFIRM: boolean;
}

describe('import', () => {
  it('.env', () => {
    expect(ENV1.DATABASE_USER).toBe('creatrip');
    expect(ENV1.DATABASE_PORT).toBe(3306);
    expect(ENV1.DATABASE_SYNC).toBe(true);
    expect(Object.keys(ENV1)).toMatchObject(['DATABASE_USER', 'DATABASE_PORT', 'DATABASE_SYNC']);
  });

  it('custom path', () => {
    expect(ENV2.DATABASE_USER).toBe('rhea-so');
    expect(ENV2.DATABASE_PORT).toBe(6379);
    expect(ENV2.DATABASE_SYNC).toBe(false);
    expect(ENV2.DATABASE_DROP).toBe(true);
    expect(Object.keys(ENV2)).toMatchObject([
      'DATABASE_USER',
      'DATABASE_PORT',
      'DATABASE_SYNC',
      'DATABASE_DROP',
    ]);
  });
});

describe('default value', () => {
  it('is ok', () => {
    expect(ENV3.RELEASE).toBe('howdy');
    expect(ENV3.VERSION).toBe(2022);
    expect(ENV3.CONFIRM).toBe(true);
    expect(ENV3.DATABASE_USER).toBe('creatrip');
    expect(ENV3.DATABASE_PORT).toBe(3306);
    expect(ENV3.DATABASE_SYNC).toBe(true);
    expect(Object.keys(ENV3)).toMatchObject([
      'DATABASE_USER',
      'DATABASE_PORT',
      'DATABASE_SYNC',
      'RELEASE',
      'VERSION',
      'CONFIRM',
    ]);
  });
});
