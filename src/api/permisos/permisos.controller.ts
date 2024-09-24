import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { Request } from '@nestjs/common';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly rolesService: PermisosService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/listpermisos' )
  getRoles(@Req() req:Request) {
    const rolesToCheck = ['Administrador'];

    const user = req['data'].data;
    const roles = user.usuarios_roles.some((item) => rolesToCheck.includes(item.rol.nombre ))
    console.log(roles)
    return this.rolesService.getPermisos();
  }
}
