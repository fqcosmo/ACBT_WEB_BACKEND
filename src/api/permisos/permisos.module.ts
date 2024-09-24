import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PermisosController } from './permisos.controller';
import { PrismaService } from '../services/prisma.service';
import { PermisosService } from './permisos.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { EventosService } from 'src/api/eventos/eventos.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',  // Considera mover esto a una variable de entorno
      signOptions: { expiresIn: '72h' }
    }),
  ],
  controllers: [PermisosController],
  providers: [PrismaService,PermisosService,JwtAuthGuard,EventosService],
})
export class RolesModule {}
