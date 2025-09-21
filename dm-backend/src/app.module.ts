import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TvModule } from './tv/tv.module';

@Module({
  imports: [TvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
