import { INodeProperties } from 'n8n-workflow';

export const otherDnsGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Domain Name',
        name: 'domain',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_dns']
            },
        },
        routing: {
            request: {
                qs: {
                    domain: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a domain to scan',
    },
];