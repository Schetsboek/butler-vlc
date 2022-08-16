import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayAudioDto } from './dto/play-audio.dto';
import { GetInfo } from './swagger/get-info.decorator';
import { PostPause } from './swagger/post-pause.decorator';
import { PostPlay } from './swagger/post-play.decorator';
import { PostResume } from './swagger/post-resume.decorator';
import { PostStop } from './swagger/post-stop.decorator';
import { VlcService } from './vlc.service';

@Controller('vlc')
export class VlcController {
  constructor(private readonly vlcService: VlcService) {}

  @Post('play')
  @PostPlay()
  public async playAudio(@Body() dto: PlayAudioDto): Promise<boolean> {
    return this.vlcService.playAudio(dto.audioName);
  }

  @Get('info')
  @GetInfo()
  public async getInfo(): Promise<object> {
    return this.vlcService.getInfo();
  }

  @Post('stop')
  @PostStop()
  public async stopAudio(): Promise<void> {
    return this.vlcService.stopAudio();
  }

  @Post('pause')
  @PostPause()
  public async pauseAudio(): Promise<void> {
    return this.vlcService.pauseAudio();
  }

  @Post('resume')
  @PostResume()
  public async resumeAudio(): Promise<void> {
    return this.vlcService.resumeAudio();
  }
}
