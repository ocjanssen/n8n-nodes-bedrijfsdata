import { INodeProperties } from 'n8n-workflow';

export const validationCityGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'City',
        name: 'city',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_city']
            },
        },
        routing: {
            request: {
                qs: {
                    city: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a city to validate',
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
                operation: ['get_city']
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
