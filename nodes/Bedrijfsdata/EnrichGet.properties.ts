import { INodeProperties } from 'n8n-workflow';

export const enrichGetOperationProperties: INodeProperties[] = [
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'nl',
		options: [{ name: 'The Netherlands', value: 'nl' }],
		routing: {
			request: {
				qs: {
					country: '={{ $value ? $value : undefined }}',
				},
			},
		},
        displayOptions: {
			show: {
				resource: ['enrich'],
				operation: ['get'],
			},
		},
		required: true,
	},

    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as credit usage. WARNING: This creates an output that needs to be parsed to process individual companies.',
        routing: {
            request: {
                qs: {
                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                },
            },
        },
        displayOptions: {
			show: {
				resource: ['enrich'],
				operation: ['get'],
			},
		},
	},
    {
        displayName: 'Company Name',
        name: 'name',
        type: 'string',
        default: '',
        description: '(Optional) Provide a company name',
        routing: {
            request: {
                qs: {
                    name: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'City',
        name: 'city',
        type: 'string',
        default: '',
        description: '(Optional) Provide a city',
        routing: {
            request: {
                qs: {
                    city: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: '(Optional) Provide a phone number',
        routing: {
            request: {
                qs: {
                    phone: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: '(Optional) Provide an address (no format requirements)',
        routing: {
            request: {
                qs: {
                    address: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'Postcode',
        name: 'postcode',
        type: 'string',
        default: '',
        description: '(Optional) Provide a postcode',
        routing: {
            request: {
                qs: {
                    postcode: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        description: '(Optional) Provide a URL',
        routing: {
            request: {
                qs: {
                    url: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },    },
    {
        displayName: 'Email Address',
        name: 'email',
        type: 'string',
								placeholder: 'name@email.com',
        default: '',
        description: '(Optional) Provide an email address',
        routing: {
            request: {
                qs: {
                    email: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
    {
        displayName: 'LinkedIn URL',
        name: 'linkedin_link',
        type: 'string',
        default: '',
        description: '(Optional) Provide a LinkedIn Profile URL',
        routing: {
            request: {
                qs: {
                    linkedin_link: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['enrich'],
                operation: ['get']
            },
        },
    },
];
