import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VlcController } from './vlc.controller';
import { VlcService } from './vlc.service';

@Module({
  imports: [HttpModule],
  controllers: [VlcController],
  providers: [VlcService]
})
export class VlcModule {}
