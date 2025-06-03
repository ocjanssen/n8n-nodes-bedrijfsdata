import { INodeProperties } from 'n8n-workflow';

export const validationLeiGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Legal Entity Identifiers (LEI) Number',
        name: 'lei',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_lei']
            },
        },
        routing: {
            request: {
                qs: {
                    lei: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a LEI number to validate',
    }
];
