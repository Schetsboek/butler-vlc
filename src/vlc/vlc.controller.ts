import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayAudioDto } from './dto/play-audio.dto';
import { GetInfo } from './swagger/get-info.decorator';
import { PostPlayAudio } from './swagger/post-play-audio.decorator';
import { VlcService } from './vlc.service';

@Controller('vlc')
export class VlcController {
  constructor(private readonly vlcService: VlcService) {}

  @Get('info')
  @GetInfo()
  public async getInfo(): Promise<object> {
    return this.vlcService.getInfo();
  }

  @Post('stop')
  public async stopAudio(): Promise<void> {
    return this.vlcService.stopAudio();
  }

  @Post('pause')
  public async pauseAudio(): Promise<void> {
    return this.vlcService.pauseAudio();
  }

  @Post('resume')
  public async resumeAudio(): Promise<void> {
    return this.vlcService.resumeAudio();
  }

  @Post('play')
  @PostPlayAudio()
  public async playAudio(@Body() dto: PlayAudioDto): Promise<boolean> {
    return this.vlcService.playAudio(dto.audioName);
  }
}
