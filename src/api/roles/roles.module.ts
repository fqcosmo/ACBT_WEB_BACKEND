import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesController } from './roles.controller';
import { PrismaService } from '../services/prisma.service';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { RolesGuard } from '../utils/Permission/Roles/RolesGuard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',  // Considera mover esto a una variable de entorno
      signOptions: { expiresIn: '72h' }
    }),
  ],
  controllers: [RolesController],
  providers: [PrismaService,RolesService,JwtAuthGuard,RolesGuard],
})
export class RolesModule {}
