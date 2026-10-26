# @emailverifier/n8n-nodes-emailverifier

This community node connects [emailverifier.dev](https://emailverifier.dev) to n8n workflows. It verifies individual email addresses, checks email domains, and reads project usage without turning uncertain results into mailbox claims.

[n8n](https://n8n.io/) is a fair-code workflow automation platform.

## Installation

Self-hosted n8n instance owners can install `@emailverifier/n8n-nodes-emailverifier` from **Settings > Community Nodes**.

The package is awaiting n8n verification. Once n8n approves it, instance owners and admins can also discover and install it from the nodes panel on n8n Cloud.

## Operations

- **Email > Verify** calls `POST /api/v1/verify` and returns the email, status, recommended action, detected signals, and any typo suggestion.
- **Domain > Check** calls `GET /api/v1/domains/{domain}` and returns the domain classification, risk, and mail-routing result.
- **Usage > Get** calls `GET /api/v1/usage` and returns the project name, completed checks, remaining credits, and last use time.

The node returns the API response unchanged. A verification result may be `deliverable`, `risky`, `undeliverable`, or `unknown`. An `unknown` result does not confirm or reject the mailbox.

## Credentials

1. [Create an emailverifier.dev account](https://emailverifier.dev/register?utm_source=n8n&utm_medium=integration&utm_campaign=community-node).
2. Create or select a project in the dashboard.
3. Copy the project's API key when it is first created or rotated.
4. In n8n, create an **emailverifier.dev API** credential and paste the key.

The credential sends the key through the `X-API-Key` header and tests it using the usage endpoint. API keys are stored by n8n as credentials and are never node parameters.

## Credits

Each authenticated email verification or domain check uses one project credit. Reading usage does not use a credit. Credits are scoped to the project resolved from the API key.

## Example workflows

- Verify a form submission before creating a CRM contact.
- Check new spreadsheet rows and route `undeliverable` addresses for review.
- Inspect a domain before accepting a lead import.
- Monitor remaining project credits on a schedule.

## Compatibility

The node uses n8n Nodes API version 1 and the strict rules from the official `@n8n/node-cli` tool. CI tests the package with Node.js 24 and the current pinned n8n node toolchain.

## Development

From this directory:

```bash
npm install
npm run check
npm run dev
```

`npm run dev` starts a local n8n instance with the node loaded. Use a project API key created from the emailverifier.dev dashboard when testing live requests.

## Resources

- [emailverifier.dev API reference](https://emailverifier.dev/docs/api)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)
- [n8n verification guidelines](https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines)

## Support

Report node issues in the [node repository](https://github.com/usamaejaz/n8n-nodes-emailverifier/issues) or email [support@emailverifier.dev](mailto:support@emailverifier.dev). Never include an API key in an issue or support message.

## Version history

- `0.1.3`: Clarify installation availability and republish the corrected metadata for verification.
- `0.1.2`: Fix node metadata for n8n verification and strengthen release validation.
- `0.1.1`: Initial scoped npm release with Email, Domain, and Usage operations.
