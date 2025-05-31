import { INodeProperties } from 'n8n-workflow';

export const companiesGetOperationProperties: INodeProperties[] = [
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'nl',
		options: [{ name: 'The Netherlands', value: 'nl' }],
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				qs: {
					country: '={{ $value ? $value : undefined }}',
                    and_or: 'AND'
				},
			},
		},
		required: true,
	},
    {
		displayName: 'Output Detailed Results',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add query details such as the total companies found',
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get']
            },
        },
        routing: {
            request: {
                qs: {
                    front: '={{ $value && $value === true ? 30 : 25  }}'
                },
            },
        },
	},
    {
        displayName: 'Results Breakdown',
        name: 'facets',
        type: 'multiOptions',
        default: [],
        options: [
            { name: 'Apps Categories', value: 'apps_cat' },
            { name: 'Data Availability', value: 'data_exists' },
            { name: 'Number of Employees', value: 'employees_range' },
            { name: 'Organization Type', value: 'orgtype' },
            { name: 'Province', value: 'province' },
            { name: 'Revenue', value: 'revenue_range' },
            { name: 'SBI', value: 'sbi' },
        ],
        routing: {
            request: {
                qs: {
                    facets: '={{ $value ? $value.join(",") : undefined }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get'],
                details: [true],
            },
        },
        description: 'Add a breakdown of results by several categories',
    },
	{
		displayName: 'Filter in JSON',
        name: 'simplify',
        type: 'boolean',
        default: false,
        description: 'Whether to use JSON to query our database (recommended for AI agents and power users)',
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get']
            },
        },
	},
    {
        displayName: 'JSON Query',
        name: 'filterJson',
        type: 'json',
        default: '{}',
        placeholder: '{ "name": "Example BV", "city": "Amsterdam" }',
        displayOptions: {
            show: {
                resource: ['companies'],
                operation: ['get'],
                simplify: [true],
            },
        },
        routing: {
            request: { // THIS IS VALID SYNTAX FOR N8N!
								// @ts-ignore
                qs: '={{ $value ? JSON.parse($value) : {} }}',
            },
        },
        description: 'Advanced JSON input for filter options. Keys should match API parameters (name, city, coc, etc). Complex queries are available through Solr operators, such as "OR", "AND", "(", ")", etc. See documentation for details.',
    },
    {
		displayName: 'Search Specific Companies/groups',
		name: 'idFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Filter',
        description: 'Search for specific companies or groups by their unique identifiers',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Bedrijfsdata.nl ID',
                name: 'id',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            id: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Bedrijfsdata.nl ID of a specific company',
            },
            {
                displayName: 'Chamber of Commerce (KvK) Number',
                name: 'coc',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            coc: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Dutch Chamber of Commerce (KvK) number of a specific company',
            },
            {
                displayName: 'Company Name',
                name: 'name',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            name: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by official name',
            },
            {
                displayName: 'Domain Name',
                name: 'domain',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            domain: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by domain name(s). Comma separate multiple domains.',
            },
            {
                displayName: 'Trade Name',
                name: 'names',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            names: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by all known names, such as trade names. Comma separate multiple values.',
            },
            {
                displayName: 'VAT Number',
                name: 'vat',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            vat: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by tax registration number (btw nummer)',
            },
        ],
    },
    {
		displayName: 'Basic Filters',
		name: 'basicFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add basic filter',
        description: 'Search companies by basic attributes',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Data Availablility',
                name: 'data_exists',
                type: 'multiOptions',
                default: [],
                options: [
                    { name: 'Address Available', value: 'address' },
                    { name: 'Email Available', value: 'email' },
                    { name: 'Phone Available', value: 'phone' },
                    { name: 'URL Available', value: 'url' },
                    { name: 'VAT Available', value: 'vat' },
                ],
                routing: {
                    request: {
                        qs: {
                            data_exists: '={{ $value ? $value.join(",") : undefined }}',
                        },
                    },
                },
                description: 'Search companies by available data types',
            },
            {
                displayName: 'Number of Employees (Est)',
                name: 'employees',
                type: 'string',
                default: '',
                placeholder: 'e.g., 5:10 or 5: or :10',
                routing: {
                    request: {
                        qs: {
                            employees: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by (estimated) number of employees. Format: Range (5:10), Minimum only (5:), Maximum only (:10).',
            },
            {
                displayName: 'Office Type',
                name: 'office_type',
                type: 'options',
                default: 'Hoofdvestiging',
                options: [
                    { name: 'All', value: '' },
                    { name: 'Hoofdvestiging', value: 'Hoofdvestiging' },
                    { name: 'Nevenvestiging', value: 'Nevenvestiging' },
                ],
                routing: {
                    request: {
                        qs: {
                            office_type: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by registration type',
            },
            {
                displayName: 'Organization Type',
                name: 'orgtype',
                type: 'multiOptions',
                default: [],
                options: [
                    { name: 'Besloten Vennootschap', value: 'Besloten Vennootschap' },
                    { name: 'Buitenlandse Rechtsvorm', value: 'Buitenlandse Rechtsvorm' },
                    { name: 'Commanditaire Vennootschap', value: 'Commanditaire Vennootschap' },
                    { name: 'Coöperatie', value: 'Coöperatie' },
                    { name: 'Eenmanszaak', value: 'Eenmanszaak' },
                    { name: 'Kerkgenootschap', value: 'Kerkgenootschap' },
                    { name: 'Maatschap', value: 'Maatschap' },
                    { name: 'Naamloze Vennootschap', value: 'Naamloze Vennootschap' },
                    { name: 'Onderlinge Waarborg Maatschappij', value: 'Onderlinge Waarborg Maatschappij' },
                    { name: 'Publiekrechtelijke Rechtspersoon', value: 'Publiekrechtelijke Rechtspersoon' },
                    { name: 'Rechtspersoon In Oprichting', value: 'Rechtspersoon in oprichting' },
                    { name: 'Rederij', value: 'Rederij' },
                    { name: 'Stichting', value: 'Stichting' },
                    { name: 'Vennootschap Onder Firma', value: 'Vennootschap Onder Firma' },
                    { name: 'Vereniging', value: 'Vereniging' },
                ],
                routing: {
                    request: {
                        qs: {
                            orgtype: '={{ $value ? $value.join(",") : undefined }}',
                        },
                    },
                },
                description: 'Filter companies by organisation type',
            },
            {
                displayName: 'Revenue (Est)',
                name: 'revenue',
                type: 'string',
                default: '',
                placeholder: 'e.g., 500000:1000000 or 500000: or :1000000',
                routing: {
                    request: {
                        qs: {
                            revenue: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by (estimated) annual revenue. Format: Range (500000:1000000), Minimum only (500000:), Maximum only (:1000000).',
            },
            {
                displayName: 'Year Founded',
                name: 'founded',
                type: 'string',
                default: '',
                placeholder: 'e.g., 2010:2020 or 2010: or :2020',
                routing: {
                    request: {
                        qs: {
                            founded: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by year of establishment. Format: Range (2010:2020), Minimum only (2010:), Maximum only (:2020).',
            },
		],
	},
    {
		displayName: 'Keyword Filters',
		name: 'keywordFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add keyword filter',
        description: 'Search companies by keyword. Companies with matching industries, activities, names and website content are returned.',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Required Keywords',
                name: 'AND_text',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            AND_text: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Companies matching all keywords you provide here are returned. Comma separate multiple values.',
            },
            {
                displayName: 'Optional Keywords',
                name: 'OR_text',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            OR_text: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Companies matching all at least one keyword you provide here are returned. Comma separate multiple values.',
            },
            {
                displayName: 'Exclude Keywords',
                name: 'NOT_text',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            NOT_text: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Companies matching none of the keywords you provide here are returned. Comma separate multiple values.',
            },
        ],
    },
    {
		displayName: 'Industry (SBI) Filters',
		name: 'industryFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add industry filter',
        description: 'Search companies by SBI code (Standaard Bedrijfsindeling 2008)',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Include SBI Code(s)',
                name: 'OR_sbi',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            OR_sbi: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by industry SBI-code. Use numerical codes without dots (e.g., "01303, 01304"). Comma separate multiple values.',
            },
            {
                displayName: 'Exclude SBI Code(s)',
                name: 'NOT_sbi',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            NOT_sbi: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Exclude companies by industry SBI-code. Use numerical codes without dots (e.g., "01303, 01304"). Comma separate multiple values',
            },
        ],
    },
    {
		displayName: 'Location Filters',
		name: 'locationFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add location filter',
        description: 'Search companies by registration address',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Address ID',
                name: 'addressid',
                type: 'string',
                default: '',
                placeholder: 'e.g., NL1234AB-150',
                routing: {
                    request: {
                        qs: {
                            addressid: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by Dutch address. Format: NL{postcode}-{house number}, e.g., "NL1234AB-150".',
            },
            {
                displayName: 'City',
                name: 'city',
                type: 'resourceLocator',
                default: { mode: 'list', value: '' },
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        placeholder: 'Search for a city',
                        typeOptions: {
                            searchListMethod: 'getCities',
                            searchable: true,
                            searchFilterRequired: false,
                        },
                    },
                ],
                routing: {
                    request: {
                        qs: {
                            city: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by Dutch city. Must exact-match the official name (case sensitive).',
            },
            {
                displayName: 'Coordinates',
                name: 'geo',
                type: 'string',
                default: '',
                placeholder: 'e.g., 52.3676,4.9041',
                routing: {
                    request: {
                        qs: {
                            geo: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by coordinates [lat],[long]. Combine with "distance" to specify regions. Alternative to location',
            },
            {
                displayName: 'Distance (Km)',
                name: 'distance',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            distance: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Number of kilometers around "location" or "coordinates (geo)" to search. Cannot be combined with city/province/addressid.',
            },
            {
                displayName: 'Location',
                name: 'location',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            location: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies in an area by place/municipality. Combine with "distance" to specify regions. Alternative to city/province/addressid',
            },
            {
                displayName: 'Postcode',
                name: 'postcode',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            postcode: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by Dutch postcode',
            },
            {
                displayName: 'Province',
                name: 'province',
                type: 'multiOptions',
                default: [],
                options: [
                    { name: 'Drenthe', value: 'Drenthe' },
                    { name: 'Flevoland', value: 'Flevoland' },
                    { name: 'Friesland', value: 'Friesland' },
                    { name: 'Gelderland', value: 'Gelderland' },
                    { name: 'Groningen', value: 'Groningen' },
                    { name: 'Limburg', value: 'Limburg' },
                    { name: 'Noord-Brabant', value: 'Noord-Brabant' },
                    { name: 'Noord-Holland', value: 'Noord-Holland' },
                    { name: 'Overijssel', value: 'Overijssel' },
                    { name: 'Utrecht', value: 'Utrecht' },
                    { name: 'Zeeland', value: 'Zeeland' },
                    { name: 'Zuid-Holland', value: 'Zuid-Holland' },
                ],
                routing: {
                    request: {
                        qs: {
                            province: '={{ $value ? $value.join(",") : undefined }}',
                        },
                    },
                },
                description: 'Search companies by Dutch province',
            },
        ],
    },
    {
		displayName: 'Technology Filters',
		name: 'technologyFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add technology filter',
        description: 'Search companies by the apps they use',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Include Apps',
                name: 'OR_apps',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            OR_apps: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by apps they use. Comma separate multiple values.',
            },
            {
                displayName: 'Exclude Apps',
                name: 'NOT_apps',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            NOT_apps: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Exclude companies using specific apps. Comma separate multiple values.',
            },
        ],
    },
    {
		displayName: 'Social Media Filters',
		name: 'socialFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add social media filter',
        description: 'Search companies by their social media presence and interactions',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Has Social Media',
                name: 'social_exists',
                type: 'multiOptions',
                default: [],
                options: [
                    { name: 'Facebook', value: 'facebook' },
                    { name: 'Instagram', value: 'instagram' },
                    { name: 'LinkedIn', value: 'linkedin' },
                    { name: 'Pinterest', value: 'pinterest' },
                    { name: 'Twitter', value: 'twitter' },
                    { name: 'YouTube', value: 'youtube' },
                ],
                routing: {
                    request: {
                        qs: {
                            social_exists: '={{ $value ? $value.join(",") : undefined }}',
                        },
                    },
                },
                description: 'Search companies by the social media channels they have',
            },
            {
                displayName: 'Social Interactions',
                name: 'social_interactions',
                type: 'string',
                default: '',
                placeholder: 'e.g., 10:50 or 10: or :50',
                routing: {
                    request: {
                        qs: {
                            social_interactions: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by Social Media likes received. Format: Range (10:50), Minimum only (10:), Maximum only (:50).',
            },
        ],
    },
    {
		displayName: 'Review Filters',
		name: 'reviewFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add review filter',
        description: 'Search companies by their reviews and ratings',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Rating',
                name: 'rating',
                type: 'string',
                default: '',
                placeholder: 'e.g., 3:4 or 3: or :4',
                routing: {
                    request: {
                        qs: {
                            rating: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by average review rating (0-5). Format: Range (3:4), Minimum only (3:), Maximum only (:4).',
            },
            {
                displayName: 'Reviews',
                name: 'reviews',
                type: 'string',
                default: '',
                placeholder: 'e.g., 50:100 or 50: or :100',
                routing: {
                    request: {
                        qs: {
                            reviews: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by number of reviews. Format: Range (50:100), Minimum only (50:), Maximum only (:100).',
            },
        ],
    },
    {
		displayName: 'Linkpartner Filters',
		name: 'linkpartnerFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add linkpartner filter',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Link Domain',
                name: 'linkdomain',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            linkdomain: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by domains they link to on their website. Powerful for finding partners.',
            },
            {
                displayName: 'Linked By',
                name: 'linked_by',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            linked_by: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by domains that link to their website. Powerful for finding partners of large companies.',
            },
            {
                displayName: 'Mentioned By',
                name: 'mentioned_by',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            mentioned_by: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search companies by domains that mention their company name. Powerful for finding partners.',
            },
            {
                displayName: 'Relation',
                name: 'relation',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            relation: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Combination of linked_by, mentioned_by and linkdomain',
            },
        ],
    },
    {
		displayName: 'Web Rank Filters',
		name: 'webrankFilterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add web rank filter',
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'DomCop Pagerank',
                name: 'pagerank',
                type: 'string',
                default: '',
                placeholder: 'e.g., 1:10 or 1: or :10',
                routing: {
                    request: {
                        qs: {
                            pagerank: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by DomCop pagerank (0-10). Format: Range (1:10), Minimum only (1:), Maximum only (:10).',
            },
            {
                displayName: 'Crux Rank',
                name: 'crux_rank',
                type: 'string',
                default: '',
                placeholder: 'e.g., 100:500 or 100: or :500',
                routing: {
                    request: {
                        qs: {
                            crux_rank: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by Crux rank (1 to 50m). Format: Range (100:500), Minimum only (100:), Maximum only (:500).',
            },
            {
                displayName: 'Tranco Rank',
                name: 'tranco_rank',
                type: 'string',
                default: '',
                placeholder: 'e.g., 100:500 or 100: or :500',
                routing: {
                    request: {
                        qs: {
                            tranco_rank: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search by Tranco rank (1 to 3m). Format: Range (100:500), Minimum only (100:), Maximum only (:500).',
            },
        ],
    },
    {
        displayName: 'Pagination Options',
		name: 'paginationOptions',
		placeholder: 'Add pagination options',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['companies'],
				operation: ['get'],
                simplify: [false],
			},
		},
		options: [
            {
                displayName: 'Results per Page',
                name: 'rows',
                type: 'number',
                default: 10,
                routing: {
                    request: {
                        qs: {
                            rows: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Number of company profiles to return',
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            page: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Page to return (given the number of results per page)',
            },
            {
                displayName: 'Offset Results',
                name: 'start',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            start: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Number of results to skip before starting to return results (alternative to "page")',
            },
        ],
    },
];
