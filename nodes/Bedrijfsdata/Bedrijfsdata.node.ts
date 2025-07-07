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
import { companiesGetManyOperationProperties } from './CompaniesGetMany.properties';
import { suggestGetOperationProperties } from './SuggestGet.properties';
import { enrichGetOperationProperties } from './EnrichGet.properties';
import { llmGetOperationProperties } from './LlmGet.properties';
import { ragUrlGetOperationProperties } from './RagUrlGet.properties';
import { ragSearchGetOperationProperties } from './RagSearchGet.properties';
import { relatedFamilyGetOperationProperties } from './RelatedFamilyGet.properties';
import { relatedSharedAddressGetOperationProperties } from './RelatedSharedAddressGet.properties';
import { advancedPeopleGetOperationProperties } from './AdvancedPeopleGet.properties';
import { advancedNewsGetOperationProperties } from './AdvancedNewsGet.properties';
import { advancedVacanciesGetOperationProperties } from './AdvancedVacanciesGet.properties';
import { validationEmailGetOperationProperties } from './ValidationEmailGet.properties';
import { validationBicGetOperationProperties } from './ValidationBicGet.properties';
import { validationCityGetOperationProperties } from './ValidationCityGet.properties';
import { validationGeocodingGetOperationProperties } from './ValidationGeocodingGet.properties';
import { validationIbanGetOperationProperties } from './ValidationIbanGet.properties';
import { validationKvKGetOperationProperties } from './ValidationKvkGet.properties';
import { validationLeiGetOperationProperties } from './ValidationLeiGet.properties';
import { validationPhoneGetOperationProperties } from './ValidationPhoneGet.properties';
import { validationPostcodeGetOperationProperties } from './ValidationPostcodeGet.properties';
import { validationUrlGetOperationProperties } from './ValidationUrlGet.properties';
import { validationVatGetOperationProperties } from './ValidationVatGet.properties';
import { otherBagGetOperationProperties } from './OtherBagGet.properties';
import { otherCurrenyGetOperationProperties } from './OtherCurrencyGet.properties';
import { otherDnsGetOperationProperties } from './OtherDnsGet.properties';
import { otherPasswordGetOperationProperties } from './OtherPasswordGet.properties';
import { otherPropertyGetOperationProperties } from './OtherPropertyGet.properties';
import { otherSiterankGetOperationProperties } from './OtherSiterankGet.properties';
import { otherTenderGetOperationProperties } from './OtherTenderGet.properties';
import { otherWebrankGetOperationProperties } from './OtherWebrankGet.properties';

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
        usableAsTool: true,
		credentials: [
			{
				name: 'bedrijfsdataApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.bedrijfsdata.nl/v1.2',
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
                    {
						name: 'Company (Related)',
						value: 'companies_related',
					},
                    {
						name: 'Data (Advanced)',
						value: 'advanced_data',
					},
					{
						name: 'Enrich',
						value: 'enrich',
					},
                    {
						name: 'Live Web RAG',
						value: 'rag',
					},
					{
						name: 'LLM Template',
						value: 'llm',
					},
					{
						name: 'Other Data',
						value: 'data_misc',
					},
					{
						name: 'Validation & Cleansing',
						value: 'validation',
					},
				],
				default: 'companies',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_many',
				displayOptions: {
					show: {
						resource: ['companies'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get company',
						description: 'Retrieve a company profile by Bedrijfsdata.nl ID',
						routing: {
							request: {
								method: 'GET',
								url: '/companies',
                                qs: {
                                    front: 30,
                                    country: 'nl',
                                }
							},
						},
					},
                    {
						name: 'Get Many',
						value: 'get_many',
						action: 'Get companies',
						description: 'Retrieve company profiles with advanced filtering options',
						routing: {
							request: {
								method: 'GET',
								url: '/companies',
                                qs: {
                                    front: 30,
                                    and_or: 'AND',
                                }
							},
						},
					},
                    {
						name: 'Get Parameter Suggestions',
						value: 'get_suggest',
						action: 'Get parameter suggestions',
						description: 'Retrieve valid filter values for text, apps, city & domain fields in "Get Companies" (/companies)',
						routing: {
							request: {
								method: 'GET',
								url: '/suggest',
                                qs: {
                                    front: 30
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get',
				displayOptions: {
					show: {
						resource: ['enrich'],
					},
				},
				options: [
					{
						name: 'Enrich Company Data',
						value: 'get',
						action: 'Enrich company data',
						description: 'Enrich your own company data',
						routing: {
							request: {
								method: 'GET',
								url: '/enrich',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get',
				displayOptions: {
					show: {
						resource: ['llm'],
					},
				},
				options: [
					{
						name: 'Execute LLM Template',
						value: 'get',
						action: 'Execute llm template',
						description: 'Generate custom content by executing your LLM template',
						routing: {
							request: {
								method: 'GET',
								url: '/llm',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_url',
				displayOptions: {
					show: {
						resource: ['rag'],
					},
				},
				options: [
					{
						name: 'Get RAG URL',
						value: 'get_url',
						action: 'Get RAG URL',
						description: 'Get content from a publicly accessible URL',
						routing: {
							request: {
								method: 'GET',
								url: '/rag_url',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get RAG Search',
						value: 'get_search',
						action: 'Get rag search',
						description: 'Get search snippets from popular search engines by query',
						routing: {
							request: {
								method: 'GET',
								url: '/rag_search',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_family',
				displayOptions: {
					show: {
						resource: ['companies_related'],
					},
				},
				options: [
					{
						name: 'Get Corporate Family',
						value: 'get_family',
						action: 'Get corporate family',
						description: 'Get companies from same corporate family as a specific company',
						routing: {
							request: {
								method: 'GET',
								url: '/corporate_family',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Shared Address',
						value: 'get_same_address',
						action: 'Get shared address',
						description: 'Get companies that are registered on the same address as a specific company',
						routing: {
							request: {
								method: 'GET',
								url: '/shared_address',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_people',
				displayOptions: {
					show: {
						resource: ['advanced_data'],
					},
				},
				options: [
					{
						name: 'Get Many Employees',
						value: 'get_people',
						action: 'Get many employees',
						description: 'Get employees of a specific company',
						routing: {
							request: {
								method: 'GET',
								url: '/people',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Many News',
						value: 'get_news',
						action: 'Get many news',
						description: 'Get news about a specific company',
						routing: {
							request: {
								method: 'GET',
								url: '/news',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Many Vacancies',
						value: 'get_vacancies',
						action: 'Get many vacancies',
                        description: 'Get vacancies of a specific company',
						routing: {
							request: {
								method: 'GET',
								url: '/vacancies',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_url',
				displayOptions: {
					show: {
						resource: ['validation'],
					},
				},
				options: [
                    {
						name: 'Geocoding',
						value: 'get_geocoding',
						action: 'Geocoding',
						description: 'Validate and format unstructured geographic data',
						routing: {
							request: {
								method: 'GET',
								url: '/geocoding',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate BIC Number',
						value: 'get_bic',
						action: 'Validate bic number',
						description: 'Validate BIC numbers',
						routing: {
							request: {
								method: 'GET',
								url: '/bic',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate City',
						value: 'get_city',
						action: 'Validate city',
						description: 'Validate (global) cities',
						routing: {
							request: {
								method: 'GET',
								url: '/city',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate Dutch VAT Number',
						value: 'get_vat',
						action: 'Validate dutch vat number',
						description: 'Validate Dutch VAT numbers (btw-nummers)',
						routing: {
							request: {
								method: 'GET',
								url: '/vat',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate Email Address',
						value: 'get_email',
						action: 'Validate email address',
						description: 'Validate email addresses (basic validation only)',
						routing: {
							request: {
								method: 'GET',
								url: '/email',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate IBAN Number',
						value: 'get_iban',
						action: 'Validate iban number',
						description: 'Validate IBAN numbers',
						routing: {
							request: {
								method: 'GET',
								url: '/iban',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate KvK Number',
						value: 'get_kvk',
						action: 'Validate kv k number',
						description: 'Validate KvK numbers',
						routing: {
							request: {
								method: 'GET',
								url: '/kvk',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate LEI Number',
						value: 'get_lei',
						action: 'Validate lei number',
						description: 'Validate LEI numbers',
						routing: {
							request: {
								method: 'GET',
								url: '/lei',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate Phone Number',
						value: 'get_phone',
						action: 'Validate phone number',
						description: 'Validate (global) phone numbers',
						routing: {
							request: {
								method: 'GET',
								url: '/phone',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate Postcode',
						value: 'get_postcode',
						action: 'Validate postcode',
						description: 'Validate (global) postcodes',
						routing: {
							request: {
								method: 'GET',
								url: '/postcode',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Validate URL',
						value: 'get_url',
						action: 'Validate URL',
						description: 'Validate URL\'s',
						routing: {
							request: {
								method: 'GET',
								url: '/url',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
				]
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
                default: 'get_siterank',
				displayOptions: {
					show: {
						resource: ['data_misc'],
					},
				},
				options: [
                    {
						name: 'Get BAG Data',
						value: 'get_bag',
						action: 'Get bag data',
						description: 'Get Dutch BAG data by address',
						routing: {
							request: {
								method: 'GET',
								url: '/bag',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get DNS Scan',
						value: 'get_dns',
						action: 'Get DNS scan',
						description: 'Retrieve data straight from a domain\'s DNS',
						routing: {
							request: {
								method: 'GET',
								url: '/dns',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get EU Tenders',
						value: 'get_tender',
						action: 'Get eu tenders',
						description: 'Query the European Tender database',
						routing: {
							request: {
								method: 'GET',
								url: '/tender',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Exchange Rate',
						value: 'get_currency',
						action: 'Get exchange rate',
						description: 'Get exchange rates for 300+ currencies (incl. crypto).',
						routing: {
							request: {
								method: 'GET',
								url: '/currency',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Password Leaks',
						value: 'get_password',
						action: 'Get password leaks',
						description: 'Find out how many times a password was leaked before',
						routing: {
							request: {
								method: 'GET',
								url: '/password',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Property Information',
						value: 'get_property',
						action: 'Get property information',
						description: 'Get property information by address or company ID',
						routing: {
							request: {
								method: 'GET',
								url: '/property',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Web Rankings',
						value: 'get_webrank',
						action: 'Get web rankings',
						description: 'Get global rankings like Majestic, CRUX, CloudFlare and DomCop',
						routing: {
							request: {
								method: 'GET',
								url: '/webrank',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                    {
						name: 'Get Website Performance',
						value: 'get_siterank',
						action: 'Get website performance',
						description: 'Get data on a company\'s website performance and popularity ranking',
						routing: {
							request: {
								method: 'GET',
								url: '/siterank',
                                qs: {
                                    front: 30,
                                }
							},
						},
					},
                ]
            },
            ...companiesGetOperationProperties,
			...companiesGetManyOperationProperties,
            ...suggestGetOperationProperties,
            ...enrichGetOperationProperties,
            ...llmGetOperationProperties,
            ...ragUrlGetOperationProperties,
            ...ragSearchGetOperationProperties,
            ...relatedFamilyGetOperationProperties,
            ...relatedSharedAddressGetOperationProperties,
            ...advancedPeopleGetOperationProperties,
            ...advancedNewsGetOperationProperties,
            ...advancedVacanciesGetOperationProperties,
            ...validationEmailGetOperationProperties,
            ...validationBicGetOperationProperties,
            ...validationCityGetOperationProperties,
            ...validationGeocodingGetOperationProperties,
            ...validationIbanGetOperationProperties,
            ...validationKvKGetOperationProperties,
            ...validationLeiGetOperationProperties,
            ...validationPhoneGetOperationProperties,
            ...validationPostcodeGetOperationProperties,
            ...validationUrlGetOperationProperties,
            ...validationVatGetOperationProperties,
            ...otherBagGetOperationProperties,
            ...otherCurrenyGetOperationProperties,
            ...otherDnsGetOperationProperties,
            ...otherPasswordGetOperationProperties,
            ...otherPropertyGetOperationProperties,
            ...otherSiterankGetOperationProperties,
            ...otherTenderGetOperationProperties,
            ...otherWebrankGetOperationProperties
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
