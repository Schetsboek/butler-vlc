import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetInfo() {
  return applyDecorators(
    ApiOperation({ summary: 'Get currently playing information'}),
    ApiOkResponse(),
    ApiBadRequestResponse()
  )
}