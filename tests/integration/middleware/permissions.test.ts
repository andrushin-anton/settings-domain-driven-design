import {
    decodeToken, encodeToken, checkPermissions,
} from '@src/presentation/graphql/middlewares/permissions';
import { ScopeType, PermissionType } from '@src/presentation/graphql/types/permission-types';
import { TEST_SECRET, TEST_ACCESS_TOKEN, TEST_DECODED_TOKEN } from '../test-utils/mocks/tokens';

describe('encoding token', () => {
    it('encodes token', () => {
        expect(encodeToken(TEST_DECODED_TOKEN, TEST_SECRET)).toBe(TEST_ACCESS_TOKEN);
    });
});

describe('decoding token', () => {
    it('decodes jwt token', () => {
        expect(decodeToken(`Bearer ${TEST_ACCESS_TOKEN}`, TEST_SECRET)).toMatchObject(TEST_DECODED_TOKEN);
    });

    it('throws an exception if there is no accessToken', () => {
        expect(() => {
            decodeToken('', TEST_SECRET);
        }).toThrow('User must be authenticated');
    });
});

describe('check permissions', () => {
    it('passes if permission exists', () => {
        expect(
            checkPermissions(
                TEST_DECODED_TOKEN, ScopeType.Project, [PermissionType.Modify, PermissionType.View],
            ),
        ).toBeUndefined();
    });
    it('throws ForbiddenError if required permission is not found', () => {
        expect(() => {
            checkPermissions(
                TEST_DECODED_TOKEN, ScopeType.Project, [PermissionType.Delete],
            );
        }).toThrow('Insufficient Permissions');
    });
});
