import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDomain = {
	resource: ['domain'],
};

const showOnlyForDomainCheck = {
	operation: ['check'],
	resource: ['domain'],
};

export const domainDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDomain,
		},
		options: [
			{
				name: 'Check',
				value: 'check',
				action: 'Check an email domain',
				description: 'Classify a domain and inspect its email routing risk',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/domains/{{encodeURIComponent($parameter.domain)}}',
					},
				},
			},
		],
		default: 'check',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		placeholder: 'example.com',
		description: 'The email domain to check, without an email address',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForDomainCheck,
		},
	},
];
