export interface Roles{
    nombre:string
}

export interface Permisos{
    nombre:string
}

export interface RolesPermisos{
    roles:Roles[],
    permisos:Permisos[]
}