import { INodeProperties } from 'n8n-workflow';

export const ragDomainGetOperationProperties: INodeProperties[] = [
    {
        displayName: 'Domain Name',
        name: 'domain',
        type: 'string',
        default: '',
        description: '(Required) Enter the domain of the website you want to retrieve',
        required: true,
        routing: {
            request: {
                qs: {
                    domain: '={{ $value ? $value : undefined }}',
                },
            },
        },
        displayOptions: {
			show: {
				resource: ['rag'],
				operation: ['get_domain'],
			},
		},
    }
];
