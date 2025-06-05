import { INodeProperties } from 'n8n-workflow';

export const advancedNewsGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_news']
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Bedrijfsdata.nl ID of the company you want to retrieve news items for',
    },
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: '(Optional) Provide a search query to search for specific news items',
        routing: {
            request: {
                qs: {
                    q: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_news']
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of news items found & credit usage. Warning: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_news']
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
