import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { configModule } from './configure.root';
import { RolesGuard } from 'src/components/guards/roles.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TokenModule,
    configModule,
    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class AppModule {}
