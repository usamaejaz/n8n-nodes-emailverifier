import type { INodeProperties } from 'n8n-workflow';

const showOnlyForEmail = {
	resource: ['email'],
};

const showOnlyForEmailVerify = {
	operation: ['verify'],
	resource: ['email'],
};

export const emailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEmail,
		},
		options: [
			{
				name: 'Verify',
				value: 'verify',
				action: 'Verify an email address',
				description: 'Check an email address and return its status, recommended action, and signals',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/verify',
					},
				},
			},
		],
		default: 'verify',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@example.com',
		description: 'The email address to verify',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForEmailVerify,
		},
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
	},
];
