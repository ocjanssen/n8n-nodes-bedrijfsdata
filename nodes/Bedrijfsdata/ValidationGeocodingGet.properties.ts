import { INodeProperties } from 'n8n-workflow';

export const validationGeocodingGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Geocoding',
        name: 'geo_q',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_geocoding']
            },
        },
        routing: {
            request: {
                qs: {
                    q: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a free form address',
    },
    {
        displayName: 'Country (ISO 3166-1 Alpha-2)',
        name: 'country_code',
        type: 'string',
        default: 'NL',
        displayOptions: {
            show: {
                resource: ['validation'],
                operation: ['get_geocoding']
            },
        },
        routing: {
            request: {
                qs: {
                    country_code: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Enter a country code (ex: NL, BE)',
    }
];
