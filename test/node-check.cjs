const assert = require('node:assert/strict');
const test = require('node:test');

const { EmailVerifier } = require('../dist/nodes/EmailVerifier/EmailVerifier.node.js');
const { EmailVerifierApi } = require('../dist/credentials/EmailVerifierApi.credentials.js');
const codex = require('../dist/nodes/EmailVerifier/EmailVerifier.node.json');
const packageJson = require('../package.json');

test('codex identifies the packaged node with its fully qualified name', () => {
	assert.equal(codex.node, `${packageJson.name}.${new EmailVerifier().description.name}`);
});

function property(description, name, resource) {
	return description.properties.find(
		(candidate) =>
			candidate.name === name &&
			(!resource || candidate.displayOptions?.show?.resource?.includes(resource)),
	);
}

test('uses the production API and project API-key credential', () => {
	const node = new EmailVerifier().description;
	const credential = new EmailVerifierApi();

	assert.equal(node.requestDefaults.baseURL, 'https://emailverifier.dev');
	assert.deepEqual(node.credentials, [{ name: 'emailVerifierApi', required: true }]);
	assert.equal(credential.authenticate.properties.headers['X-API-Key'], '={{$credentials.apiKey}}');
	assert.equal(credential.test.request.url, '/api/v1/usage');
});

test('exposes only the three public REST resources', () => {
	const description = new EmailVerifier().description;
	const resources = property(description, 'resource').options.map((option) => option.value);

	assert.deepEqual(resources, ['email', 'domain', 'usage']);
	assert.equal(property(description, 'operation', 'email').options[0].routing.request.url, '/api/v1/verify');
	assert.equal(
		property(description, 'operation', 'domain').options[0].routing.request.url,
		'=/api/v1/domains/{{encodeURIComponent($parameter.domain)}}',
	);
	assert.equal(property(description, 'operation', 'usage').options[0].routing.request.url, '/api/v1/usage');
});

test('sends the email as the verification request body', () => {
	const description = new EmailVerifier().description;
	const email = property(description, 'email', 'email');

	assert.equal(email.required, true);
	assert.deepEqual(email.routing.send, { type: 'body', property: 'email' });
});
