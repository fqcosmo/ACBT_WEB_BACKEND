import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UpdateRoles } from '../model/UsuariosDTO';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ResponseUpdateUser } from '../model/UsuariosDTO';


@Injectable()
export class RolesService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getRoles() {
        try {
            const roles = this.prisma.roles.findMany({
                include: {
                    permisos_roles: {
                        include: {
                            permiso: true
                        }
                    },
                    _count: {
                        select: {
                            permisos_roles: true,
                            usuarios_roles: true
                        }
                    }
                }
            })
            return roles;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateUser(user: UpdateRoles) {
        const listRoles = user.listpermisos;
        console.log(listRoles);

        // Eliminar la propiedad `listUserRoles` antes de la actualización
        delete user.listpermisos;

        try {
            if (!user.id) {
                throw new HttpException('ID del rol es requerido', HttpStatus.BAD_REQUEST);
            }

            // Primero, actualizamos el usuario
            const result = await this.prisma.roles.update({
                where: {
                    id: Number(user.id)
                },
                data: user,
            });

            // Si la actualización del usuario no se realizó correctamente, lanzamos una excepción
            if (!result) {
                throw new HttpException('No se pudo actualizar el rol', HttpStatus.NOT_FOUND);
            }

            // Eliminamos los roles existentes del usuario
            await this.prisma.permisos_roles.deleteMany({
                where: {
                    idRol: Number(user.id)
                }
            });

            // Creamos los nuevos roles de usuario de forma concurrente
            await Promise.all(
                listRoles.map(id =>
                    this.prisma.permisos_roles.create({
                        data: {
                            idPermiso: id,
                            idRol: Number(user.id)
                        }
                    })
                )
            );

            console.log(result);

            const response: ResponseUpdateUser = {
                message: 'Roles actualizado correctamente',
                status: 200
            };

            return response;

        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message || 'Error en el servidor al actualizar el rol ',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


    async createRol(rol: string) {
        try {
            const rolesResult = await this.prisma.roles.create({
                data: rol,
                include: {
                    permisos_roles: {
                        include: {
                            permiso: true
                        }
                    },
                    _count: {
                        select: {
                            permisos_roles: true,
                            usuarios_roles: true
                        }
                    }
                }
            })
            return rolesResult;
        } catch (error) {
            throw new Error(error);
        }
    }
}
