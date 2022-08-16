import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function PostPlay() {
  return applyDecorators(
    ApiOperation({ summary: 'Play audio by sending it\'s name.'}),
    ApiOkResponse(),
    ApiBadRequestResponse(),
    ApiNotFoundResponse({ description: 'Audio file does not exist. Did you misspell it?' })
  )
}