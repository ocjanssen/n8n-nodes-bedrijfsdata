import { INodeProperties } from 'n8n-workflow';

export const advancedPeopleGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_people']
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Bedrijfsdata.nl ID of the company you want to retrieve the employees of',
    },
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: '(Optional) Search query to filter your results by. Provide the degree of specificity GDPR compliance mandates in your use case.',
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
                operation: ['get_people']
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of people found & credit usage. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_people']
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
