import { INodeProperties } from 'n8n-workflow';

export const llmGetOperationProperties: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'template',
		type: 'string',
		default: 'company_summary',
        required: true,
        description: '(Required) The ID of the LLM template to execute. You can find the template ID in your Bedrijfsdata.nl Developers Platform account under "LLM templates".',
		routing: {
			request: {
				qs: {
					template: '={{ $value ? $value : undefined }}',
				},
			},
		},
        displayOptions: {
			show: { 
				resource: ['llm'],
				operation: ['get'],
			},
		},
	},
    {
		displayName: 'Provider API Key',
		name: 'provider_key',
		type: 'string',
		default: '',
        required: true,
        description: '(Required) Provide your API key to the LLM model your templates uses',
		typeOptions: {
            password: true,
        },
        routing: {
			request: {
				qs: {
					provider_key: '={{ $value ? $value : undefined }}',
				},
			},
		},
        displayOptions: {
			show: { 
				resource: ['llm'],
				operation: ['get'],
			},
		},
	},
    {
		displayName: 'Provider Endpoint',
		name: 'provider_url',
		type: 'string',
		default: '',
        description: '(Required depending on model) Provide the model endpoint URL that corresponds with the model your endpoint uses. Example: https://{location}-aiplatform.googleapis.com/v1beta1/projects/{project}/locations/{location}/endpoints/openapi/chat/completions.',
		routing: {
			request: {
				qs: {
					provider_url: '={{ $value ? $value : undefined }}',
				},
			},
		},
        displayOptions: {
			show: { 
				resource: ['llm'],
				operation: ['get'],
			},
		},
	},
    {
        displayName: 'Template Parameters',
		name: 'templateOptions',
		placeholder: 'Add template parameter',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['llm'],
				operation: ['get'],
			},
		},
		options: [
            {
                displayName: 'Bedrijfsdata.nl ID',
                name: 'id',
                type: 'string',
                default: '',
                description: '(Optional) Bedrijfsdata.nl ID of a specific company. Provide your template with data from company profiles.',
                routing: {
                    request: {
                        qs: {
                            id: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
            {
                displayName: 'Domain Name',
                name: 'domain',
                type: 'string',
                default: '',
                description: '(Optional) Publicly accessible domain. Provide your template with the contents of a specific website (uses /rag_url under the hood).',
                routing: {
                    request: {
                        qs: {
                            domain: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
            {
                displayName: 'Search Query',
                name: 'manual_q',
                type: 'string',
                default: '',
                description: '(Optional) Search query. Provide your template with the contents of dozens of websites (uses /rag_search under the hood).',
                routing: {
                    request: {
                        qs: {
                            manual_q: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
            {
                displayName: 'URL',
                name: 'manual_url',
                type: 'string',
                default: '',
                description: '(Optional) Publicly accessible URL. Provide your template with the contents of a specific URL (uses /rag_url under the hood).',
                routing: {
                    request: {
                        qs: {
                            manual_url: '={{ $value ? $value : undefined }}',
                        },
                    },
                }
            },
        ],
    },
];
