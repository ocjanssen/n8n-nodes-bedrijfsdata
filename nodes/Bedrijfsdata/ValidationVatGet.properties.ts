import { INodeProperties } from 'n8n-workflow';

export const validationVatGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Dutch VAT Number',
        name: 'vat',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_vat']
            },
        },
        routing: {
            request: {
                qs: {
                    vat: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a Dutch VAT number (btw-nummer) to validate',
    }
];
