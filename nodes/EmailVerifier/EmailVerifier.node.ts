import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

import { domainDescription } from './resources/domain';
import { emailDescription } from './resources/email';
import { usageDescription } from './resources/usage';

export class EmailVerifier implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'emailverifier.dev',
		name: 'emailVerifier',
		icon: {
			light: 'file:emailVerifier.svg',
			dark: 'file:emailVerifier.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Verify email addresses and inspect email domains',
		defaults: {
			name: 'emailverifier.dev',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'emailVerifierApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://emailverifier.dev',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'Usage',
						value: 'usage',
					},
				],
				default: 'email',
			},
			...emailDescription,
			...domainDescription,
			...usageDescription,
		],
	};
}
