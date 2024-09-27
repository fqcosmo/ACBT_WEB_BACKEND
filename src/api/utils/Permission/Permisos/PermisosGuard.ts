import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


export class PermisoGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request["data"]?.data;
        const administrador = user.usuarios_roles;
        const validarAdministrador = administrador[0].rol.nombre;
        if (validarAdministrador != 'Administrador') {
            return false;
        }
        return true;
    }
}
