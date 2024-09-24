import { Module } from '@nestjs/common';
import { UsuariosModule } from '../auth/usuarios.module';
import { PrismaService } from '../services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../utils/Security/JwtService';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { PermisosService } from '../permisos/permisos.service';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';


@Module({
  imports: [UsuariosModule,
    RolesModule,
    JwtModule.register({
      secret: 'secretKey',  
      signOptions: { expiresIn: '72h' }
    }),
  ],
  controllers: [EventosController],
  providers: [PrismaService,EventosService,PermisosService,JwtAuthGuard,RolesService],
})
export class EventosModule {}
