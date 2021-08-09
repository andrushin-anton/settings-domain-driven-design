export interface PermissionGroups {
    [group: string]: string[]
}

export interface DecodedToken {
    id: string,
    name: string,
    server: string,
    iat: number,
    data?: unknown,
    permissions: PermissionGroups,
}
