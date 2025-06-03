import { INodeProperties } from 'n8n-workflow';

export const companiesGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get']
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
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as credit usage. WARNING: This creates an output that needs to be parsed to process the company.',
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get']
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
