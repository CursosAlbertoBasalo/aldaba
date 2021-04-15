import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const source = value as string;
    if (!source) return '';
    const limit = (args[0] as string) ? parseInt(args[0] as string) : 20;
    if (source.length <= limit) return source;
    const trail = args[1] ?? '...';
    return source.substring(0, limit) + trail;
  }
}
