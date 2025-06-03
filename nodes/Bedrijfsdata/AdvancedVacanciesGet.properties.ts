import { INodeProperties } from 'n8n-workflow';

export const advancedVacanciesGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_vacancies']
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Bedrijfsdata.nl ID of the company you want to retrieve vacancies for',
    },
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: '(Optional) Provide a search query to search for specific vacancies',
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
                operation: ['get_vacancies']
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of vacancies found & credit usage. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['advanced_data'],
                operation: ['get_vacancies']
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
