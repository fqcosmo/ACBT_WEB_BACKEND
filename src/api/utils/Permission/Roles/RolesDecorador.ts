import { SetMetadata } from '@nestjs/common';
import {Roles} from '../../../model/RolesDTO';
export const RolesDecorator = (data: Roles[]) => {
  return SetMetadata('roles', data);
};



