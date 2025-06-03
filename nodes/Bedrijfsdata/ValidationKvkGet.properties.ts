import { INodeProperties } from 'n8n-workflow';

export const validationKvKGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Kamer Van Koophandel (KvK) Number',
        name: 'kvk',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_kvk']
            },
        },
        routing: {
            request: {
                qs: {
                    kvk: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a KvK number to validate',
    }
];
