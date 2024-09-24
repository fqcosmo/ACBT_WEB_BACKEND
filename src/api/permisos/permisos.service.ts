import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PermisosService {
    constructor(
        private prisma:PrismaService
    ){}
    async getPermisos(){
        try{
            const roles = this.prisma.permisos.findMany();
            console.log(roles)
            return roles;
        }catch(error){
            throw new Error(error)
        }
    }


}
