import { SetMetadata } from '@nestjs/common';
import {Permisos} from '../../../model/RolesDTO';
export const PermisosDecorator = (data: Permisos[]) => {
  return SetMetadata('permisos', data);
};



