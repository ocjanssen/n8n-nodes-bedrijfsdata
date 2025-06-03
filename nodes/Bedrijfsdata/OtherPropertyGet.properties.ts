import { INodeProperties } from 'n8n-workflow';

export const otherPropertyGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Bedrijfsdata.nl ID',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_property']
            },
        },
        routing: {
            request: {
                qs: {
                    company_id: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Search by Bedrijfsdata.nl ID of a specific company',
    },
    {
        displayName: 'Address ID',
        name: 'addressid',
        type: 'string',
        default: '',
        placeholder: 'e.g., NL1234AB-150',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_property']
            },
        },
        routing: {
            request: {
                qs: {
                    addressid: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Search by (Dutch) address. Format: NL{postcode}-{house number}, for example "NL1234AB-150".',
    },
];
