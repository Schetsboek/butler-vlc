import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function PostPause() {
  return applyDecorators(
    ApiOperation({ summary: 'Pause current audio playing.'}),
    ApiOkResponse(),
  )
}