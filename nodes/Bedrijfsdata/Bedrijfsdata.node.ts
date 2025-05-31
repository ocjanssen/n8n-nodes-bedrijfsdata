import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	NodeOperationError,
	IExecutePaginationFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	IDataObject,
	DeclarativeRestApiSettings,
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
			headers: {
				'Accept': 'application/json',
			}
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'companies',
					},
				],
				default: 'companies',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						resource: ['companies'],
						operation: ['get'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: ['companies'],
						operation: ['get'],
						returnAll: [false],
					},
				},
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
						action: 'Search companies',
						description: 'Retrieve company profiles with advanced filtering options',
						routing: {
							request: {
								method: 'GET',
								url: '/companies',
								qs: {
									start: '={{ !$parameter.returnAll && $parameter.paginationOptions && ($parameter.paginationOptions.start === 0 || $parameter.paginationOptions.start) ? $parameter.paginationOptions.start : undefined }}',
									page: '={{ !$parameter.returnAll && $parameter.paginationOptions && $parameter.paginationOptions.page && !($parameter.paginationOptions.start === 0 || $parameter.paginationOptions.start) ? $parameter.paginationOptions.page : undefined }}',
									rows: '={{ !$parameter.returnAll ? ($parameter.limit ? $parameter.limit : ($parameter.paginationOptions && $parameter.paginationOptions.rows ? $parameter.paginationOptions.rows : 10)) : undefined }}',
								},
							},
							send: {
								paginate: '={{ $parameter.returnAll }}',
							},
							operations: {
								async pagination(this: IExecutePaginationFunctions, requestOptions: DeclarativeRestApiSettings.ResultOptions): Promise<INodeExecutionData[]> {
									const allResults: INodeExecutionData[] = [];
									let currentPage = 1;
									const pageSize = this.getNodeParameter('paginationOptions.rows', 0) as number || 10;
									const userStartOffset = this.getNodeParameter('paginationOptions.start', 0) as number;

									if (!requestOptions.options) {
										requestOptions.options = {};
									}
									if (!requestOptions.options.qs) {
										requestOptions.options.qs = {};
									}

									let currentOffset = userStartOffset >= 0 ? userStartOffset : 0;
									let useStartParameter = userStartOffset >= 0;

									let keepGoing = true;
									while (keepGoing) {
										requestOptions.options.qs.rows = pageSize;
										if (useStartParameter) {
											requestOptions.options.qs.start = currentOffset;
											delete requestOptions.options.qs.page;
										} else {
											requestOptions.options.qs.page = currentPage;
											delete requestOptions.options.qs.start;
										}

										const response = await this.makeRoutingRequest(requestOptions);
										let items: any[] = [];
										const responseData = response[0]?.json as IDataObject | any[];

										if (Array.isArray(responseData)) {
											items = responseData;
										} else if (responseData && Array.isArray(responseData.companies)) {
											items = responseData.companies;
										} else if (responseData && Array.isArray(responseData.data)) {
											items = responseData.data;
										} else {
											this.logger.warn('Pagination: Unexpected response structure or no items array found.');
											keepGoing = false;
											break;
										}

										if (items.length === 0) {
											keepGoing = false;
										} else {
											allResults.push(...items.map(item => ({ json: item })));
											if (items.length < pageSize) {
												keepGoing = false;
											} else {
												if (useStartParameter) {
													currentOffset += pageSize;
												} else {
													currentPage++;
												}
											}
										}
									}
									return allResults;
								},
							},
							output: {
								postReceive: [
									async function (this: IExecuteSingleFunctions, items: INodeExecutionData[]): Promise<INodeExecutionData[]> {
										if (this.getNodeParameter('returnAll', 0) as boolean) {
											return items;
										}

										const responseData = items[0]?.json as IDataObject | any[];
										let companies: any[] = [];

										if (Array.isArray(responseData)) {
											companies = responseData;
										} else if (responseData && Array.isArray(responseData.companies)) {
											companies = responseData.companies;
										} else if (responseData && Array.isArray(responseData.data)) {
											companies = responseData.data;
										} else {
											this.logger.warn('Single Page: Unexpected response structure or no items array found.');
											return this.helpers.returnJsonArray([]);
										}
										return this.helpers.returnJsonArray(companies);
									},
								],
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
