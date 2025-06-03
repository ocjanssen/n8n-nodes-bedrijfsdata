import { INodeProperties } from 'n8n-workflow';

export const validationEmailGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Email Address',
        name: 'email',
        type: 'string',
								placeholder: 'name@email.com',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_email']
            },
        },
        routing: {
            request: {
                qs: {
                    email: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter email address to validate',
    }
];
