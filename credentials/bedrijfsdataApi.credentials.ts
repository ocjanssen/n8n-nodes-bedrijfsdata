import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class bedrijfsdataApi implements ICredentialType {
	icon = 'file:logo.svg' as Icon;
	name = 'bedrijfsdataApi';
	displayName = 'Bedrijfsdata API';
	documentationUrl = 'https://docs.bedrijfsdata.nl/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.bedrijfsdata.nl/v1.2',
			method: 'GET',
			url: '/companies',
			qs: {
				country: 'nl',
				rows: 0,
				front: 30,
			}
		},
	};
}
