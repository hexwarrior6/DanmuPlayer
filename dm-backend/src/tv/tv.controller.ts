import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { TvService } from './tv.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get('channel/:id')
  @HttpCode(HttpStatus.OK)
  async getChannelUrl(@Param('id') channelId: string) {
    return this.tvService.getChannelUrl(channelId);
  }
}
