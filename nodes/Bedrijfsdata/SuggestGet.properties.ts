import { INodeProperties } from 'n8n-workflow';

export const suggestGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Suggestion Type',
        name: 'suggestion_type',
        type: 'options',
        default: 'text',
        required: true,
        description: 'Select a field to get suggestions for',
        options: [
            { name: 'Keywords (Text)', value: 'text' },
            { name: 'Technology - Apps, Frameworks, Etc. (Apps)', value: 'apps' },
            { name: 'City (City, NL Only)', value: 'city' },
            { name: 'Domain Names (Domain)', value: 'domain' }
        ],
        routing: {
            request: {
                qs: {
                    type: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get_suggest'],
            },
        }
    },
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        required: true,
        description: '(Required) Enter a query to fetch suggestions. Pro tip: the first 2-4 letters usually suffice to get relevant suggestions.',
        routing: {
            request: {
                qs: {
                    q: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get_suggest'],
            },
        },
    },
    {
		displayName: 'Output as Individual Items',
        name: 'details',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get_suggest']
            },
        },
        routing: {
            request: {
                qs: {
                    no_header: '={{ $value && $value === true ? 1 : undefined }}'
                },
            },
        },
	},
];
