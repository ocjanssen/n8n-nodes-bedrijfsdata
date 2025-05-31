import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	NodeOperationError,
} from 'n8n-workflow';
import { apiRequest } from './GenericFunctions';
import { companiesGetOperationProperties } from './CompaniesGet.properties';

export class Bedrijfsdata implements INodeType {
	description: INodeTypeDescription = {
		name: 'bedrijfsdata',
		displayName: 'Bedrijfsdata',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from the Bedrijfsdata API.',
		defaults: {
			name: 'Bedrijfsdata',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bedrijfsdataApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.bedrijfsdata.nl/v1.1',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Companies',
						value: 'companies',
					},
				],
				default: 'companies',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['companies'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'get',
						action: 'Search Companies',
						description: 'Retrieve company profiles with advanced filtering options.',
						routing: {
							request: {
								method: 'GET',
								url: '/companies'
							},
						},
					},
				],
				default: 'get',
			},
			// Spread the imported Companies Get operation properties
			...companiesGetOperationProperties,
		],
	};

	methods = {
        listSearch: {
            async getCities(this: ILoadOptionsFunctions, query?: string): Promise<INodeListSearchResult> {
                try {
                    type SuggestApiResponse = {
                        status: string;
                        found: number;
                        suggest: Array<{ term: string }>;
                        message?: string;
                    };

                    const response = await apiRequest.call(this, 'GET', 'suggest', {}, {
                        type: 'city',
                        q: query,
                    }) as SuggestApiResponse;

                    if (response && response.status === 'ok' && Array.isArray(response.suggest)) {
                        return {
                            results: response.suggest.map(item => ({
                                name: item.term,
                                value: item.term,
                            })),
                        };
                    } else {
                        const errorMessage = response?.message || 'Unexpected API response from /suggest endpoint';
                        throw new NodeOperationError(this.getNode(), `Failed to fetch cities: ${errorMessage}`);
                    }
                } catch (error) {
                    if (error instanceof NodeOperationError) {
                        throw error;
                    }
                    const message = (error as Error).message || 'Unknown error during API request';
                    throw new NodeOperationError(this.getNode(), `Error fetching cities: ${message}`);
                }
            }
        },
};
}
