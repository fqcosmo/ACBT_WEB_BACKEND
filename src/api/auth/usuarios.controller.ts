import { Body, Controller, Post, Get, Put, Headers, Delete, UseGuards, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginAccess, Usuarios, UsuariosWithRole } from '../model/UsuariosDTO';
import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/utils/Security/JwtService';
import { Query } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { RolesGuard } from 'src/api/utils/Permission/Roles/RolesGuard';

@Controller('auth')
export class UsuariosController {

    constructor(
        private usuarioService: UsuariosService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/searchuser/:id')
    async getSearchUser(@Param('id') id: number) {
        return this.usuarioService.getSearchUser(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/listuser')
    async getUser() {
        return this.usuarioService.getUser();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/listuserPage')

    async getUserPagination(@Query('page') page: string) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        return this.usuarioService.getUser(pageNumber);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/listroles')
    async getRoles() {
        return this.usuarioService.getRoles();
    }

    @Post('/login')
    async loginUsers(@Body() accessLogin: LoginAccess) {
        return this.usuarioService.loginUsers(accessLogin)
    }

    @Get('/session')
    async getSession(@Headers('authorization') authHeader: string): Promise<any> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization header missing or malformed');
        }
        const token = authHeader.split(' ')[1];
        return this.usuarioService.getSession(token);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/create')
    async createUser(@Body() user: Usuarios, @Req() req: Request) {
        return this.usuarioService.createUser(user)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/update')
    async updateUser(@Body() user: UsuariosWithRole) {
        return this.usuarioService.updateUser(user)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/delete/:idUser')
    async deleteUser(@Param(':idUser') idUser: number) {
        return this.deleteUser(idUser);
    }
}
