import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function PostResume() {
  return applyDecorators(
    ApiOperation({ summary: 'Resume current audio set.'}),
    ApiOkResponse(),
  )
}