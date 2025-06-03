import { INodeProperties } from 'n8n-workflow';

export const validationIbanGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'IBAN Number',
        name: 'iban',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_iban']
            },
        },
        routing: {
            request: {
                qs: {
                    iban: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a IBAN number to validate',
    }
];
