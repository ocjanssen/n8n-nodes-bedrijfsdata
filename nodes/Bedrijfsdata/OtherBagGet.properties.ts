import { INodeProperties } from 'n8n-workflow';

export const otherBagGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Postcode',
        name: 'postcode',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_bag']
            },
        },
        routing: {
            request: {
                qs: {
                    postcode: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a postcode',
    },
    {
        displayName: 'House Number',
        name: 'number',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_bag']
            },
        },
        routing: {
            request: {
                qs: {
                    number: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Required) Enter a house number',
    },
    {
        displayName: 'Suffix',
        name: 'suffix',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['data_misc'],
                operation: ['get_bag']
            },
        },
        routing: {
            request: {
                qs: {
                    suffix: '={{ $value ? $value : undefined }}',
                },
            },
        },
        description: '(Optional) Enter a suffix to the house number, such as "2" or "A"',
    },
];
