import { INodeProperties } from 'n8n-workflow';

export const validationBicGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'BIC Number',
        name: 'bic',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_bic']
            },
        },
        routing: {
            request: {
                qs: {
                    bic: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a BIC number to validate',
    }
];
