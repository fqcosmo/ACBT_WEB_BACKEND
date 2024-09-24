import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../../model/RolesDTO'; 
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request["data"].data;
    console.log(user)

    if (!user || !user.usuarios_roles) {
      throw new UnauthorizedException('NO TIENES PERMISO A ESTA ACCIÓN');
    }

    const response = requiredRoles.some(role =>
        user.usuarios_roles.some(userRole => userRole.rol.nombre === role.nombre)
    );

    
    return response;
  }
}
