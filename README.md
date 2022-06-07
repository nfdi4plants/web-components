# nfdi4plants/web-components

## NPM

You can see the latest package version [here](https://www.npmjs.com/package/@nfdi4plants/web-components)

Check out the in depth documentation [here](https://nfdi4plants.github.io/web-components-docs/) :books:

## List of projects using these web-components

- [nfdi-homepage](https://github.com/nfdi4plants/nfdi4plants.github.io)
- [nfdi-helpdesk](https://github.com/Freymaurer/nfdi-helpdesk)
- dataplant-registration-frontend, found at bwcloud Gitlab Freiburg
- keycloak theme for gitlab login, found at bwcloud Gitlab Freiburg 

Update webcomponents with ```npm install @nfdi4plants/web-components@latest``` or according to project README.md.


## Installation

For standard projects which already contain node module dependency bundling you can **install** and **update** the webcomponents with:

```bash
npm install @nfdi4plants/web-components@latest
```

### Examples

**1. Fable/SAFE:** [nfdi-helpdesk](https://github.com/Freymaurer/nfdi-helpdesk/blob/main/src/Client/nfdi-webcomponents.fs)

# Development

## Set up

Pull repository and navigate to root folder.

```bash
npm install
```

## run locally

```bash
npm run dev
```

## build

```bash
npm run build
```

## publish to npm 

Increase version in `package.json`.

```bash
npm publish --dry-run
```

```bash
npm publish
```

_If this should not work, for example `package is not in the npm registry`. try `npm login` first to login to an account with release rights._
