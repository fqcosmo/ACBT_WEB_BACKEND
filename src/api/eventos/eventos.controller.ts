import { Controller, Get, Put ,UseGuards, InternalServerErrorException, Query, Post, Param, Body, Delete } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { RolesGuard } from 'src/api/utils/Permission/Roles/RolesGuard';
import { Eventos } from '../model/EventosDTO';
import { RolesDecorator } from '../utils/Permission/Roles/RolesDecorador';
import { PermisoGuard } from '../utils/Permission/Permisos/PermisosGuard';
import { PermisosDecorator } from '../utils/Permission/Permisos/PermisosDecorator';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, PermisoGuard)
  @PermisosDecorator([{nombre: 'Administrador'}])
  @RolesDecorator([{ nombre: 'ver.eventos' }])
  @Get('/listevents')
  async getEventos(): Promise<any> { 
    try {
      const result = await this.eventosService.getEventos();
      return result;  
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener eventos', error.message);
    }
  }


  @UseGuards(JwtAuthGuard,RolesGuard,PermisoGuard)
  @PermisosDecorator([{nombre: 'Administrador'}])
  @RolesDecorator([{ nombre: 'ver.eventos' }])
  @Get('/buscar/:nombre')
  async getBuscarEventos(@Query() nombre:string){
    try{
      return await this.eventosService.getBuscarEventos(nombre)
    }catch(error){
      throw new Error('ERROR SERVER INTERNAL');
    }
  }

  @UseGuards(JwtAuthGuard,RolesGuard,PermisoGuard)
  @PermisosDecorator([{nombre: 'Administrador'}])
  @RolesDecorator([{ nombre: 'ver.eventos' }])
  @Post('/create')
  async createEventos(eventos:Eventos){
    return this.eventosService.createEventos(eventos)
  }

  @UseGuards(JwtAuthGuard,RolesGuard,PermisoGuard)
  @PermisosDecorator([{nombre: 'Administrador'}])
  @RolesDecorator([{ nombre: 'ver.eventos' }])
  @Put('/update/:idUser')
  async updateEventos(@Param() idUser:number, @Body() eventos:Eventos){
    return this.eventosService.updateEventos(idUser,eventos)
  }

  @UseGuards(JwtAuthGuard,RolesGuard,PermisoGuard)
  @PermisosDecorator([{nombre: 'Administrador'}])
  @RolesDecorator([{ nombre: 'ver.eventos' }])
  @Delete('/delete/:idEvento')
  async deleteEventos(@Param() idEvento:number){
    return this.eventosService.deleteEventos(idEvento)
  }
}
