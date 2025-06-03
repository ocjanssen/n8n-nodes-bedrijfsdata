import { INodeProperties } from 'n8n-workflow';

export const validationPostcodeGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Postcode',
        name: 'postcode',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_postcode']
            },
        },
        routing: {
            request: {
                qs: {
                    postcode: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a postcode to validate',
    },
    {
        displayName: 'Country (ISO 3166-1 Alpha-2)',
        name: 'country_code',
        type: 'string',
        default: 'nl',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_postcode']
            },
        },
        routing: {
            request: {
                qs: {
                    country_code: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a country code (ex: nl, us)',
    }
];
