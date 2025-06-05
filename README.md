# n8n-nodes-bedrijfsdata

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

An n8n community node for integrating with the [Bedrijfsdata.nl API](https://docs.bedrijfsdata.nl/). This node allows you to search and retrieve comprehensive Dutch company information directly within your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-bedrijfsdata`
4. Agree to the risks and select **Install**

### Docker (Quick Start)

Run n8n with the Bedrijfsdata node pre-installed:

```bash
./run.sh
```

Then access n8n at http://localhost:5678

To update the node after making changes:
```bash
npm run build && docker-compose restart
```

### Manual Installation

To get started:

```bash
npm install n8n-nodes-bedrijfsdata
```

## Credentials

You need a Bedrijfsdata.nl API key to use this node:

1. Sign up at [Bedrijfsdata.nl](https://bedrijfsdata.nl/)
2. Get your API key from your account dashboard
3. In n8n, create new credentials of type "Bedrijfsdata API"
4. Enter your API key

## Supported Operations

### Companies Resource

#### Get Company
Retrieve a company profile by Bedrijfsdata.nl ID.

#### Get Companies
Search and retrieve Dutch company information with extensive filtering options:

**Basic Search Parameters:**
- **Country**: Netherlands (required)
- **Text**: Keyword search across company names, industries, activities, and website content

**Company Identification:**
- **Company ID**: Bedrijfsdata.nl unique identifier
- **Company Name**: Official company name
- **All Names**: Search across all known names including trade names
- **Chamber of Commerce Number**: KvK number
- **VAT Number**: BTW number
- **Domain**: Company website domain

**Location-based Search:**
- **City**: Dutch city (case-sensitive, official name)
- **Province**: Dutch province (case-sensitive, official name)
- **Postcode**: Dutch postal code
- **Address ID**: Format: NL{postcode}-{house number} (e.g., "NL1234AB-150")
- **Location**: Search by city/municipality with distance
- **Geo Coordinates**: Search by latitude,longitude with distance
- **Distance**: Radius in kilometers (use with location or geo coordinates)

**Company Characteristics:**
- **Office Type**: Hoofdvestiging (main office) or Nevenvestiging (branch office)
- **Organization Type**: Legal entity types (BV, NV, Stichting, etc.)
- **Employees**: Number of employees (range format: 5:10, 5:, :10)
- **Revenue**: Annual revenue (range format: 500000:1000000, 500000:, :1000000)
- **Founded**: Year of establishment (range format: 2010:2020, 2010:, :2020)
- **SBI Code**: Industry classification codes (comma-separated)

**Digital Presence:**
- **Apps**: Technologies/apps used by the company
- **Monthly Visits**: Website traffic estimates (range format)
- **Social Exists**: Available social media channels (Facebook, Instagram, LinkedIn, etc.)
- **Social Interactions**: Social media engagement metrics (range format)
- **PageRank**: DomCop PageRank (0-10, range format)
- **Crux Rank**: Crux ranking (1-50m, range format)
- **Tranco Rank**: Tranco ranking (1-3m, range format)

**Relationship Analysis:**
- **Linked By**: Domains that link to the company website
- **Link Domain**: Domains the company links to
- **Mentioned By**: Domains that mention the company
- **Relation**: Combination of linked_by, mentioned_by, and linkdomain

**Data Availability:**
- **Data Exists**: Filter by available data types (address, email, phone, etc.)
- **Rating**: Average review rating (0-5, range format)
- **Reviews**: Number of reviews (range format)

**Output Control:**
- **Rows**: Number of companies to return

### Enrich Resource

#### Enrich Company Data
Enrich your own company data with additional information from Bedrijfsdata.

### LLM Template Resource

#### Execute LLM Template
Generate custom content by executing your LLM template with company data.

### Web RAG Resource

#### Get RAG URL
Extract and analyze content from a publicly accessible URL.

#### Get RAG Search
Get search snippets from popular search engines by query.

### Related Companies Resource

#### Get Corporate Family
Find companies that belong to the same corporate family as a specific company.

#### Get Shared Address
Discover companies that are registered at the same address as a specific company.

### Advanced Company Data Resource

#### Get Many Employees
Retrieve employee information for a specific company.

#### Get Many News
Collect news articles related to a specific company.

#### Get Many Vacancies
Find job openings posted by a specific company.

### Validation & Cleansing Resource

#### Validate Email Address
Perform basic validation on email addresses.

#### Validate BIC Number
Verify the validity of BIC (Bank Identifier Code) numbers.

#### Validate City
Validate global city names.

#### Geocoding
Convert addresses to geographic coordinates and vice versa.

#### Validate IBAN Number
Check the validity of IBAN (International Bank Account Number) formats.

#### Validate KvK Number
Verify Dutch Chamber of Commerce (KvK) registration numbers.

#### Validate LEI Number
Validate Legal Entity Identifier (LEI) numbers.

#### Validate Phone Number
Check and format global phone numbers.

#### Validate Postcode
Verify postal code formats from different countries.

#### Validate URL
Check URL validity and structure.

#### Validate Dutch VAT Number
Verify Dutch VAT numbers (BTW-nummers).

### Other Data Resource

#### Get BAG Data
Retrieve Dutch BAG (Basisregistratie Adressen en Gebouwen) data by address.

#### Get Exchange Rate
Access exchange rates for over 300 currencies, including cryptocurrencies.

#### Get DNS Scan
Extract data directly from a domain's DNS records.

#### Get Password Leaks
Check how many times a password has been exposed in data breaches.

#### Get Property Information
Obtain property details by address or company ID.

#### Get Website Performance
Analyze a company's website performance and popularity rankings.

#### Get EU Tenders
Search the European Tender database.

#### Get Web Rankings
Access global rankings like Majestic, CRUX, CloudFlare, and DomCop.

## Usage Examples

### Basic Company Search
Search for companies by keyword:
```json
{
  "resource": "companies",
  "operation": "get",
  "country": "nl",
  "additionalFields": {
    "text": "software development",
    "rows": 10
  }
}
```

### Find Companies by Location
Search for companies in Amsterdam:
```json
{
  "resource": "companies",
  "operation": "get",
  "country": "nl",
  "additionalFields": {
    "city": "Amsterdam",
    "orgtype": ["Besloten Vennootschap"],
    "employees": "10:100"
  }
}
```

### Technology Company Analysis
Find companies using specific technologies:
```json
{
  "resource": "companies",
  "operation": "get",
  "country": "nl",
  "additionalFields": {
    "apps": "Salesforce,HubSpot",
    "social_exists": ["linkedin", "twitter"],
    "monthly_visits": "1000:"
  }
}
```

### Geographic Radius Search
Find companies within 25km of coordinates:
```json
{
  "resource": "companies",
  "operation": "get",
  "country": "nl",
  "additionalFields": {
    "geo": "52.3676,4.9041",
    "distance": 25,
    "revenue": "1000000:"
  }
}
```

## Range Format

Many fields support range queries with the following format:
- **Range**: `min:max` (e.g., `100:500`)
- **Minimum only**: `min:` (e.g., `100:`)
- **Maximum only**: `:max` (e.g., `:500`)

## API Documentation

For detailed API documentation, visit [docs.bedrijfsdata.nl](https://docs.bedrijfsdata.nl/).

## Compatibility

- **n8n version**: 0.187.0 or later
- **Node.js version**: 20.15 or later

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Bedrijfsdata.nl API Documentation](https://docs.bedrijfsdata.nl/)

## Development

### Prerequisites

- Node.js 20.15 or later
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/ocjanssen/n8n-nodes-bedrijfsdata.git

# Install dependencies
npm install

# Build the node
npm run build

# Lint the code
npm run lint

# Auto-fix linting issues
npm run lintfix
```

### Testing

To test the node locally:

1. Build the node: `npm run build`
2. Link it to your global n8n installation: `npm link`
3. In your n8n directory: `npm link n8n-nodes-bedrijfsdata`
4. Start n8n: `n8n start`

OR

```bash
./run.sh
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE.md)

## Support

If you encounter any issues or have questions:

1. Check the [Bedrijfsdata.nl API documentation](https://docs.bedrijfsdata.nl/)
2. Review the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
3. Open an issue in this repository
