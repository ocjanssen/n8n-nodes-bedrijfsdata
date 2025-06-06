import { INodeProperties } from 'n8n-workflow';

export const otherCurrenyGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Currency Code',
        name: 'currency',
        type: 'string',
        default: 'eur',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_currency']
            },
        },
        routing: {
            request: {
                qs: {
                    currency: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter currency code to use as a baseline',
    },
];
