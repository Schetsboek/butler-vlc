import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class PlayAudioDto {
  @IsString()
  @Matches('^[a-zA-Z_]+$', 'g')
  audioName: string;

  @IsBoolean()
  @IsOptional()
  repeat?: boolean;
}
