import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('PGHOST'),
      port: configService.get<number>('PGPORT'),
      username: configService.get<string>('PGUSER'),
      password: configService.get<string>('PGPASSWORD'),
      database: configService.get<string>('PGDATABASE'),
      autoLoadEntities: true,
      // migrations: [
      //   /*...*/
      // ],
      // migrationsTableName: 'migrations',
      synchronize: true,
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
