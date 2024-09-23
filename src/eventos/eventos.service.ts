import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class EventosService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getEventos() {
        try {
            const result = await this.prisma.eventos.findMany();
            return result;
        } catch (error) {
            throw new Error();
        }
    }
}
