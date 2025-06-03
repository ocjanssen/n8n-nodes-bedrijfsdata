import { INodeProperties } from 'n8n-workflow';

export const otherTenderGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Search Query',
        name: 'tender_q',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_tender']
            },
        },
        routing: {
            request: {
                qs: {
                    q: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter search query to retrieve EU tenders',
    },
];
