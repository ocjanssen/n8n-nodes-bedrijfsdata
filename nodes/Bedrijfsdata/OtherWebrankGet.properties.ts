import { INodeProperties } from 'n8n-workflow';

export const otherWebrankGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Domain Name',
        name: 'domain',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_webrank'],
            },
        },
        routing: {
            request: {
                qs: {
                    domain: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter domain to retrieve rankings for',
    },
];