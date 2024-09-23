import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './auth/usuarios.module';
import { PrismaService } from './services/prisma.service';
import { UsuariosController } from './auth/usuarios.controller';
import { UsuariosService } from './auth/usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './JwtService';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { EventosController } from './eventos/eventos.controller';
import { PermisosService } from './permisos/permisos.service';
import { EventosModule } from './eventos/eventos.module';
import { EventosService } from './eventos/eventos.service';
import { PermisosController } from './permisos/permisos.controller';

@Module({
  imports: [
    EventosModule,
    UsuariosModule,
    RolesModule,
    JwtModule.register({
      secret: 'secretKey',  // Considera mover esto a una variable de entorno
      signOptions: { expiresIn: '72h' }
    }),
  ],
  controllers: [AppController,UsuariosController,EventosController,PermisosController],
  providers: [AppService,PrismaService, UsuariosService,RolesService,PermisosService,JwtAuthGuard,EventosService],
})
export class AppModule {}
