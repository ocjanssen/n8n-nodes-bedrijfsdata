import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
} from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: object = {},
	query?: IDataObject,
): Promise<any> {
	query = query || {};

	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: `https://api.bedrijfsdata.nl/v1.1/${endpoint}`,
		json: true,
	};

	if (method === 'GET') {
		delete options.body;
	}

	return await this.helpers.requestWithAuthentication.call(this, 'bedrijfsdataApi', options);
}
