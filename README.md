# nfdi4plants/web-components

## NPM

You can see the latest package version [here](https://www.npmjs.com/package/@nfdi4plants/web-components)

_If this should not work, for example `package is not in the npm registry`. try `npm login` first to login to an account with release rights._

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

Then you can choose any of the options mentioned [here](https://lit.dev/docs/tools/adding-lit/#use-your-component) to use the components.

For projects without bundling, you can use  [rollup](https://rollupjs.org/guide/en/) as an easy to use bundler:

<details><summary>Extensive explanation for rollup setup </summary>
<p>

1. Create a ``package.json`` with:
    ```json
    {
        "dependencies": {
            "@nfdi4plants/web-components": "^0.3.0",
        },
        "devDependencies": {
            "@rollup/plugin-node-resolve": "^13.1.3",
            "rollup": "^2.70.1"
        }
    }
    ```
    Feel free to use the latest `@nfdi4plants/web-components` version.
2. Run `npm install`.
3. Create a `rollup.config.js` with
    ```js
    import { nodeResolve } from '@rollup/plugin-node-resolve';

    // https://rollupjs.org/guide/en/#configuration-files
    export default {
    input: 'src/js/main.js',
    output: {
        file: 'src/js/bundle.js',
        format: 'cjs'
    },
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve
    plugins: [nodeResolve()]
    };
    ```
4. Create js file which references all web-components, exmp:
    ```js
    // main.js
    import {Navbar, Footer} from "@nfdi4plants/web-components";
    ```
5. Run `rollup --config rollup.config.js`.
6. Reference `bundle.js` as shown [here](https://lit.dev/docs/tools/adding-lit/#use-your-component).

</p>
</details>

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
