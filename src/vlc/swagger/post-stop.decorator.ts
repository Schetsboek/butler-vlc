import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function PostStop() {
  return applyDecorators(
    ApiOperation({ summary: 'Stop current audio playing.'}),
    ApiOkResponse(),
  )
}