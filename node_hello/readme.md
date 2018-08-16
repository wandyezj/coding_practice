# Commands

Compile the files (tsconfig.json) (compiles .ts to javascript) 
> tsc

Run the files
> node ./out/index.js

Create webpack (webpack.config.json) (create one file that can be run verses being split into multiple files)
> npx webpack

Run webpacked file
> node ./out/dist/main.js

Run build and run command
> npm run build

# Installed Modules

[node types](https://www.npmjs.com/package/@types/node)

    >npm install --save @types/node

[webpack](https://webpack.js.org/guides/getting-started/) 

    > npm install webpack webpack-cli --save-dev

[typescript](https://www.npmjs.com/package/typescript)

    > npm install -g typescript

[typescript compiler](https://www.npmjs.com/package/tsc-init)

# References

[Webpack](https://jlongster.com/Backend-Apps-with-Webpack--Part-I)
The target in the webpack config must be node in order to use node modules