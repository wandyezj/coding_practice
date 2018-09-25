# Typescript Definition Language

The goal: be able to define APIs in typescript and use these definitions to generate stubs for another language.


## General Layout

Typescript declaration files *.d.ts will be used to mark up the API definition.

Ideally a single file contains a single declaration.

### Overall flow

declaration file *.d.ts --[reader]-> API description *.json --[language specific stub writer]-> Language specific stubs


### Strict Declarations
What is supported in declarations will be strict.

Only what is positively supported will be allowed any deviation will result in errors.



## Supported Declarations

What specific declarations are supported?

How are the specific declarations converted to language specific stubs?

### interface

### class