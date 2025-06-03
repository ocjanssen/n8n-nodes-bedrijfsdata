import { INodeProperties } from 'n8n-workflow';

export const validationPhoneGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_phone']
            },
        },
        routing: {
            request: {
                qs: {
                    phone: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a phone number to validate',
    },
    {
        displayName: 'Country (ISO 3166-1 Alpha-2)',
        name: 'country_code',
        type: 'string',
        default: 'nl',
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_phone']
            },
        },
        routing: {
            request: {
                qs: {
                    country_code: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Enter a country code (ex: nl, us)',
    }
];
