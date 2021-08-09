import { sign, verify } from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { DecodedToken, PermissionGroups } from '../types/token';
import { ScopeType, PermissionType } from '../types/permission-types';

export const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'secret';

export function decodeToken(accessToken: string, secret: string): DecodedToken {
    // decode & verify token
    if (!accessToken) {
        throw new AuthenticationError('User must be authenticated');
    }
    return verify(accessToken.replace('Bearer ', ''), secret) as DecodedToken;
}

export function encodeToken(token: DecodedToken, secret: string): string {
    return sign(token, secret, { algorithm: 'HS256' });
}

export function checkPermissions(
    token: DecodedToken,
    scope: ScopeType,
    permissions: PermissionType[],
): void {
    const tokenPermissions = (typeof token.permissions === 'string')
        ? JSON.parse(token.permissions) as PermissionGroups
        : token.permissions;

    const scopedPermissions: string[] = tokenPermissions[scope] ?? [];
    if (!(scopedPermissions && permissions.every(
        (permission: string) => scopedPermissions.includes(permission),
    ))) {
        throw new ForbiddenError('Insufficient Permissions');
    }
}
