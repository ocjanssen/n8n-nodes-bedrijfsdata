import { INodeProperties } from 'n8n-workflow';

export const relatedSharedAddressGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['companies_related'],
                operation: ['get_same_address']
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: 'Bedrijfsdata.nl ID of a specific company',
    },
    {
        displayName: 'Max. Number of Results',
        name: 'rows',
        type: 'number',
        default: 10,
        displayOptions: {
            show: {
                resource: ['companies_related'],
                operation: ['get_same_address']
            },
        },
        routing: {
            request: {
                qs: {
                    rows: '={{ $value ? $value : 10 }}',
                },
            },
        },
        description: 'Number of company profiles to return',
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of companies found & credit usage. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['companies_related'],
                operation: ['get_same_address']
            },
        },
        routing: {
            request: {
                qs: {
                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                },
            },
        },
	},
];
