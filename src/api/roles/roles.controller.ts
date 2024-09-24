import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { Put } from '@nestjs/common';
import { UpdateRoles, UsuariosWithRole } from '../model/UsuariosDTO';
import { RolesGuard } from 'src/api/utils/Permission/Roles/RolesGuard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('/listroles')
  getRoles() {
    return this.rolesService.getRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateUser(@Body() user: UpdateRoles) {
    return this.rolesService.updateUser(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRol(@Body() rol:string){
    return this.rolesService.createRol(rol)
  }
}
