import { INodeProperties } from 'n8n-workflow';

export const otherSiterankGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_siterank']
            },
        },
        routing: {
            request: {
                qs: {
                    company_id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Search by Bedrijfsdata.nl ID of a specific company',
    },
    {
        displayName: 'Domain Name',
        name: 'domain',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_siterank']
            },
        },
        routing: {
            request: {
                qs: {
                    domain: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Search by domain name',
    },
];
