import { INodeProperties } from 'n8n-workflow';

export const ragSearchGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        description: '(Required) Enter a search query',
        required: true,
        routing: {
            request: {
                qs: {
                    q: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
			show: {
				resource: ['rag'],
				operation: ['get_search'],
			},
		},
    },
	{
        displayName: 'Search Options',
		name: 'searchOptions',
		placeholder: 'Add search option',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['rag'],
				operation: ['get_search'],
			},
		},
		options: [
            {
                displayName: 'Country (ISO 639-1)',
                name: 'country',
                type: 'string',
                default: 'NL',
                description: '(Optional) Enter a country to search from (ex: US or NL)',
                routing: {
                    request: {
                        qs: {
                            country: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
            {
                displayName: 'Language (ISO 3166-1 Alpha-2)',
                name: 'lang',
                type: 'string',
                default: 'nl',
                description: '(Optional) Enter a language to search in (ex: us or nl)',
                routing: {
                    request: {
                        qs: {
                            lang: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
																typeOptions: {
																	minValue: 1,
																},
                default: 50,
                routing: {
                    request: {
                        qs: {
                            limit: '={{ ($value || $value === 0) ? $value : undefined }}',
                        },
                    },
                },
                description: 'Max number of results to return',
            },
            {
                displayName: 'Timeout',
                name: 'timeout',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            timeout: '={{ ($value || $value === 0) ? $value : undefined }}',
                        },
                    },
                },
                description: '(Optional) Enter a timeout. Applies to the time allocated for content retrieval. 0.5 is quick, but will lack summaries. 10 will ensure summaries are provided for all pages with decent loading times.',
            },
        ],
    },
    {
        displayName: 'Output Options',
		name: 'outputOptions',
		placeholder: 'Add output option',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['rag'],
				operation: ['get_search'],
			},
		},
		options: [
            {
                displayName: 'Add Cleaned HTML',
                name: 'add_reader',
                type: 'options',
                default: 0,
                options: [
                    { name: 'Disable', value: 0 },
                    { name: 'Cleaned HTML', value: 1 },
                ],
                routing: {
                    request: {
                        qs: {
                            add_reader: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Add Markdown',
                name: 'add_markdown',
                type: 'options',
                default: 0,
                options: [
                    { name: 'No Markdown', value: 0 },
                    { name: 'CommonMark', value: 1 },
                    { name: 'Cleaned Markdown without Images and Links', value: 2 },
                ],
                routing: {
                    request: {
                        qs: {
                            add_markdown: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Add Raw Content',
                name: 'add_raw',
                type: 'options',
                default: 0,
                options: [
                    { name: 'Disable', value: 0 },
                    { name: 'Raw Content', value: 1 },
                ],
                routing: {
                    request: {
                        qs: {
                            add_raw: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Add Raw HTML',
                name: 'add_html',
                type: 'options',
                default: 0,
                options: [
                    { name: 'Disable', value: 0 },
                    { name: 'Raw HTML', value: 1 },
                ],
                routing: {
                    request: {
                        qs: {
                            add_html: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Max. Snippets Length',
                name: 'max_snippets_length',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            max_snippets_length: '={{ ($value || $value === 0) ? $value : undefined }}',
                        },
                    },
                },
                description: '(Optional) Enter a max. length for the snippets in the response. If a value greater than 0 is provided, a list of unique sentences is added to the result.',
            },
        ],
    },
];
