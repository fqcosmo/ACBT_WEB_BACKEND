import { Controller, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { RolesGuard } from 'src/api/utils/Permission/Roles/RolesGuard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/listevents')
  async getEventos() {
    try {
      const result = await this.eventosService.getEventos();
      return result;  
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener eventos', error.message);
    }
  }
}
