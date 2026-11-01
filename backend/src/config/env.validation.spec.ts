import { validateEnv } from './env.validation';

const valid = { DATABASE_URL: 'postgresql://u:p@localhost:5433/db' };

describe('validateEnv', () => {
  it('applies defaults', () => {
    expect(validateEnv(valid)).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
      CORS_ORIGIN: 'http://localhost:5173',
      DATABASE_SSL: false,
    });
  });

  it('coerces PORT and parses DATABASE_SSL strings', () => {
    const env = validateEnv({ ...valid, PORT: '4000', DATABASE_SSL: 'true' });
    expect(env.PORT).toBe(4000);
    expect(env.DATABASE_SSL).toBe(true);
    expect(validateEnv({ ...valid, DATABASE_SSL: 'false' }).DATABASE_SSL).toBe(
      false,
    );
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });

  it('rejects invalid values', () => {
    expect(() => validateEnv({ ...valid, PORT: '70000' })).toThrow(/PORT/);
    expect(() => validateEnv({ ...valid, NODE_ENV: 'staging' })).toThrow(
      /NODE_ENV/,
    );
    expect(() => validateEnv({ ...valid, DATABASE_SSL: 'yes' })).toThrow(
      /DATABASE_SSL/,
    );
  });

  it('does not include values in error messages', () => {
    expect(() =>
      validateEnv({ DATABASE_URL: 'not-a-url-with-secret-hunter2' }),
    ).not.toThrow(/hunter2/);
  });
});
