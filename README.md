## set up

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

## List of projects using these web-components

- [nfdi-homepage](https://github.com/nfdi4plants/nfdi4plants.github.io)
- [nfdi-helpdesk](https://github.com/Freymaurer/nfdi-helpdesk)
- dataplant-registration-frontend

### Update web-components in these projects

```npm install @nfdi4plants/web-components@{newMajor}.{newMinor}.{newPatch}```