import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

const pipe = new ZodValidationPipe(
  z.object({ title: z.string().min(1), count: z.coerce.number().default(1) }),
);

describe('ZodValidationPipe', () => {
  it('returns parsed data with defaults and coercion applied', () => {
    expect(pipe.transform({ title: 'bug', count: '5' })).toEqual({
      title: 'bug',
      count: 5,
    });
    expect(pipe.transform({ title: 'bug' })).toEqual({
      title: 'bug',
      count: 1,
    });
  });

  it('throws 400 listing field paths without echoing values', () => {
    try {
      pipe.transform({ title: '' });
      fail('expected to throw');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      const body = (err as BadRequestException).getResponse() as {
        errors: { path: string }[];
      };
      expect(body.errors[0].path).toBe('title');
    }
  });

  it('rejects non-object input', () => {
    expect(() => pipe.transform(undefined)).toThrow(BadRequestException);
  });
});
