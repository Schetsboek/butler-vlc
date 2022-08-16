import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import { firstValueFrom } from 'rxjs';
import Config from './../config';

@Injectable()
export class VlcService {

  constructor(private readonly httpService: HttpService) {}

  public async getInfo(): Promise<object> {
    const { data } = await firstValueFrom(this.httpService.get('http://' + Config.VLC_HOST + ':' + Config.VLC_PORT + '/requests/status.json', { auth: {
        username: Config.VLC_USERNAME,
        password: Config.VLC_PASSWORD
      }
    }));
    return data;
  }

  public async stopAudio(): Promise<void> {
    await firstValueFrom(this.httpService.get('http://' + Config.VLC_HOST + ':' + Config.VLC_PORT + '/requests/status.json?command=pl_stop', { auth: {
        username: Config.VLC_USERNAME,
        password: Config.VLC_PASSWORD
      }
    }));
  }

  public async resumeAudio(): Promise<void> {
    await firstValueFrom(this.httpService.get('http://' + Config.VLC_HOST + ':' + Config.VLC_PORT + '/requests/status.json?command=pl_play', { auth: {
        username: Config.VLC_USERNAME,
        password: Config.VLC_PASSWORD
      }
    }));
  }

  public async pauseAudio(): Promise<void> {
    await firstValueFrom(this.httpService.get('http://' + Config.VLC_HOST + ':' + Config.VLC_PORT + '/requests/status.json?command=pl_pause', { auth: {
        username: Config.VLC_USERNAME,
        password: Config.VLC_PASSWORD
      }
    }));
  }

  public async playAudio(audioName: string): Promise<void> {
    // Because exec is vulnerable to shell injections, it's tested here again.
    if (!new RegExp(/^[a-zA-Z_]+$/g).test(audioName)) {
      throw new BadRequestException('Does not conform to Regex: [a-zA-Z_]+');
    }
    if (!existsSync(Config.MUSIC_FOLDER + '/' + audioName + '.mp3')) {
      throw new NotFoundException('Audio file does not seem to exist.');
    }
    exec('cvlc -f --play-and-exit --novideo --one-instance ' + Config.MUSIC_FOLDER + '/' + audioName + '.mp3');
  }
}
