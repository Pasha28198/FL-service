import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { configModule } from './configure.root';

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
  controllers: [AppController]
})
export class AppModule {}
