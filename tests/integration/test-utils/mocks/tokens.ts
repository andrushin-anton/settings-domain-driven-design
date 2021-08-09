import { sign } from 'jsonwebtoken';

export const TEST_SECRET = 'secret';

export const TEST_DECODED_TOKEN = {
    iat: 123,
    id: '1',
    name: 'spiderman',
    permissions: {
        project: [
            'permissionView',
            'permissionModify',
            'permissionCreate',
        ],
        stream: [
            'permissionView',
            'permissionModify',
            'permissionCreate',
        ],
    },
    server: 'localhost',
};

export const TEST_ACCESS_TOKEN = sign(TEST_DECODED_TOKEN, TEST_SECRET);
