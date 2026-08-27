import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class EmailVerifierApi implements ICredentialType {
	name = 'emailVerifierApi';

	displayName = 'emailverifier.dev API';

	icon: Icon = {
		light: 'file:../nodes/EmailVerifier/emailVerifier.svg',
		dark: 'file:../nodes/EmailVerifier/emailVerifier.dark.svg',
	};

	documentationUrl = 'https://emailverifier.dev/docs/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://emailverifier.dev',
			url: '/api/v1/usage',
			method: 'GET',
		},
	};
}
