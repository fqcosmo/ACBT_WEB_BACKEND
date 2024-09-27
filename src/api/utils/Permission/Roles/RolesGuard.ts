import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../../model/RolesDTO';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());

    const hasPermission = requiredRoles.find(item => item.nombre === 'ver.eventos')

    if(!hasPermission){
      throw new UnauthorizedException('NO TIENES LOS PERMISOS PARA VER LOS EVENTOS')
    }
    return true; 
  }
}