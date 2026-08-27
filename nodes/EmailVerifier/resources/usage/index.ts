import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUsage = {
	resource: ['usage'],
};

export const usageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUsage,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get project usage',
				description: 'Get the project credit balance and completed check count',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/usage',
					},
				},
			},
		],
		default: 'get',
	},
];
