Steps:

> npm init

> tsc --init

> npm install --save @types/node

> npm install ts-node --save-dev

Create index.ts

Add gitignore for node_modules

Add the following script to package.json
> "index" : "./node_modules/.bin/ts-node ./index.ts"

[Add debugging](https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a)
in tsconfig.json set 
>"sourceMap" : true, "outDir": "./out",

Add launch.json
tasks.json
package.json script
> "start:debug": "ts-node --inspect=5858 --debug-brk --ignore false index.ts"



# Installed Modules
[node types](https://www.npmjs.com/package/@types/node)

    >npm install --save @types/node