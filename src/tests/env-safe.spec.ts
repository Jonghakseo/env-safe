import { Key, Env } from '../index';

@Env()
class ENV1 {
  @Key()
  static DATABASE_USER: string;

  @Key()
  static DATABASE_PORT: number;

  @Key()
  static DATABASE_SYNC: boolean;
}

@Env({ path: 'src/tests/env/redis.env' })
class ENV2 {
  @Key()
  static DATABASE_USER: string;

  @Key()
  static DATABASE_PORT: number;

  @Key()
  static DATABASE_SYNC: boolean;

  @Key()
  static DATABASE_DROP: boolean;
}

@Env()
class ENV3 {
  @Key()
  static DATABASE_USER: string;

  @Key()
  static DATABASE_PORT: number;

  @Key()
  static DATABASE_SYNC: boolean;

  @Key({ default: 'howdy' })
  static RELEASE: string;

  @Key({ default: 2022 })
  static VERSION: number;

  @Key({ default: true })
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
