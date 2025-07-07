import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: object = {},
	query?: IDataObject,
): Promise<any> {
	query = query || {};

	query.front = 30;

	const options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: `https://api.bedrijfsdata.nl/v1.2/${endpoint}`,
		json: true,
	};

	if (method === 'GET') {
		delete options.body;
	}

	return await this.helpers.httpRequestWithAuthentication.call(this, 'bedrijfsdataApi', options);
}