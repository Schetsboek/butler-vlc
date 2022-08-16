import { Module } from '@nestjs/common';
import { VlcModule } from './vlc/vlc.module';

@Module({
  imports: [
    VlcModule
  ]
})
export class AppModule {}
