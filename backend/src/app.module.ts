import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [UsersModule, TournamentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
