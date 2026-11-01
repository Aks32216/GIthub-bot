/**
 * Masks the first two thirds of a value with `*` and leaves the last third
 * readable, for logging PII or identifiers:
 * maskSensitive('amish@example.com') -> '************e.com'.
 * Values shorter than 3 characters are fully masked.
 */
export function maskSensitive(value: string): string {
  const visible = Math.floor(value.length / 3);
  return (
    '*'.repeat(value.length - visible) + value.slice(value.length - visible)
  );
}
