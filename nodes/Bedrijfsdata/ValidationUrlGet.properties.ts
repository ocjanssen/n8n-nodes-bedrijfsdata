import { INodeProperties } from 'n8n-workflow';

export const validationUrlGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_url']
            },
        },
        routing: {
            request: {
                qs: {
                    url: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a URL to validate',
    }
];
