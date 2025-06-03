import { INodeProperties } from 'n8n-workflow';

export const otherPasswordGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Password',
        name: 'password',
        type: 'string',
								typeOptions: { password: true },
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_password']
            },
        },
        routing: {
            request: {
                qs: {
                    password: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Enter password to scan for leaks',
    },
    {
        displayName: 'Password (SHA1)',
        name: 'password_sha1',
        type: 'string',
								typeOptions: { password: true },
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_password']
            },
        },
        routing: {
            request: {
                qs: {
                    password_sha1: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Recommended) Enter hashed password to scan for leaks',
    },
];
