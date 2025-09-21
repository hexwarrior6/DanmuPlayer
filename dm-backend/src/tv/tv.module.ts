import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TvController } from './tv.controller';
import { TvService } from './tv.service';

@Module({
  imports: [HttpModule],
  controllers: [TvController],
  providers: [TvService],
  exports: [TvService],
})
export class TvModule {}
