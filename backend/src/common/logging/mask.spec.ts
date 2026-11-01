import { maskSensitive } from './mask';

describe('maskSensitive', () => {
  it('masks two thirds and keeps the last third visible', () => {
    expect(maskSensitive('abcdefghi')).toBe('******ghi');
    expect(maskSensitive('abcdef')).toBe('****ef');
  });

  it('keeps length unchanged', () => {
    const value = 'octocat@example.com';
    expect(maskSensitive(value)).toHaveLength(value.length);
  });

  it('fully masks values shorter than 3 characters', () => {
    expect(maskSensitive('ab')).toBe('**');
    expect(maskSensitive('a')).toBe('*');
  });

  it('returns an empty string for empty input', () => {
    expect(maskSensitive('')).toBe('');
  });
});
