import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import Config from './../config';

@Injectable()
export class VlcService {
  constructor() {}

  public async stopAudio(): Promise<void> {
    exec('ps axf | grep /usr/bin/vlc | grep -v grep | awk \'{print "kill " $1}\' | sh');
  }

  public async resumeAudio(): Promise<void> {
    exec('ps axf | grep /usr/bin/vlc | grep -v grep | awk \'{print "kill -CONT " $1}\' | sh');
  }

  public async pauseAudio(): Promise<void> {
    exec('ps axf | grep /usr/bin/vlc | grep -v grep | awk \'{print "kill -STOP " $1}\' | sh');
  }

  public async playAudio(audioName: string, repeat?: boolean): Promise<void> {
    // Because exec is vulnerable to shell injections, it's tested here again.
    if (!new RegExp(/^[a-zA-Z_]+$/g).test(audioName)) {
      throw new BadRequestException('Does not conform to Regex: [a-zA-Z_]+');
    }
    if (!existsSync(Config.MUSIC_FOLDER + '/' + audioName + '.mp3')) {
      throw new NotFoundException('Audio file does not seem to exist.');
    }
    await this.stopAudio();
    let repeatSetting = '--play-and-exit';
    if (repeat) {
      repeatSetting = '--repeat'
    }
    exec('/usr/bin/vlc -I dummy -f ' + repeatSetting + ' --novideo ' + Config.MUSIC_FOLDER + '/' + audioName + '.mp3');
  }

  public async playAudioFolder(audioFolder: string): Promise<void> {
    // Because exec is vulnerable to shell injections, it's tested here again.
    if (!new RegExp(/^[a-zA-Z_]+$/g).test(audioFolder)) {
      throw new BadRequestException('Does not conform to Regex: [a-zA-Z_]+');
    }
    await this.stopAudio();
    exec('/usr/bin/vlc -I dummy -L -Z --novideo ' + Config.MUSIC_FOLDER + '/' + audioFolder);
  }
}
