import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

// Usage: @Body(new ZodValidationPipe(schema)) dto: z.infer<typeof schema>
// The 400 response lists field paths and reasons only, never the submitted values.
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
    return result.data;
  }
}
