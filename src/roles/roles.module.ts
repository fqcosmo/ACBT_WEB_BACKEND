import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesController } from './roles.controller';
import { PrismaService } from 'src/services/prisma.service';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/JwtService';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',  // Considera mover esto a una variable de entorno
      signOptions: { expiresIn: '72h' }
    }),
  ],
  controllers: [RolesController],
  providers: [PrismaService,RolesService,JwtAuthGuard],
})
export class RolesModule {}
