import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function PostPlayAudio() {
  return applyDecorators(
    ApiOperation({ summary: 'Set audio file to be played'}),
    ApiOkResponse(),
    ApiBadRequestResponse(),
    ApiNotFoundResponse({ description: 'Audio file does not exist. Did you misspell it?' })
  )
}