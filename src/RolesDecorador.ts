import { SetMetadata } from '@nestjs/common';
import { RolesPermisos } from './model/RolesDTO'; // Asegúrate de que la ruta sea correcta

export const RolesDecorator = (data: RolesPermisos) => {
  SetMetadata('roles', data.roles);
  return SetMetadata('permisos', data.permisos);
};


