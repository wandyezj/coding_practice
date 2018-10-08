# Typescript Definition Language

The goal: be able to define APIs in typescript and use these definitions to generate stubs for another language.

All code will be written in typescript and executed with [ts-node](https://www.npmjs.com/package/ts-node)
This is to keep things consistent and 

## Goals

* define an API once in a typescript .d.ts file and have that API be reflected in multiple languages.
* Document once in the .d.ts file and have that documentation be reflected in the multiple languages. 
* provide support for specific design patterns that enable common functionality.
    * events
    * checking if an API or a set of APIs are supported.
* Enable automatic API design guidance to avoid common developer pitfalls.
    * Do not allow two functions with the same name except that one ends in an s as this can be confusing and result in bugs that waste developers time.
    * Enforce common standard naming conventions to make things less confusing for API consumers.
    * Every SetX must be paired with a GetX for convenience and testability (it's ok to have a readonly GetX without a SetX)
* Detect changes in API surface.
* Provide support for marking APIs as:
    * Public
        * All APIs are public by default.
    * Internal
        * APIs intended for consumption only by first party developers.
    * Beta
        * API is in preview and subject to change or complete removal.
    * Deprecated
        * API is slated to be removed.
* Provide support for automatic test stub generation
    * ideally tests would be defined as part of the API contract and arguably these examples should be part of the documentation, although this may be difficult for some APIs that require state information.
    * Automatic translation of test examples to other languages.
    * This would allow tests to be defined once and translated to work on top of the other languages allowing each implementation to have the same test coverage.


## Existing Systems

* [API Extractor](https://github.com/Microsoft/web-build-tools/wiki/API-Extractor)
    * API Extractor focuses on extracting existing typescript APIs verses defining new APIs.
    * The goal of Typescript Definition Language is to be able to automatically generate multiple APIs from a single definition.
    * API Extractor could be useful on a language output of Typescript.

* [tslint](https://palantir.github.io/tslint/)
    * Enables writing of custom rules to check typescript code and provides highlighting in VS Code.

* [Typescript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
    * Access to a reader that can read the typescript files.

* [ts-node](https://www.npmjs.com/package/ts-node)
    * API to parse the .d.ts file

## General Layout

Typescript declaration files *.d.ts will be used to mark up the API definition.

The API definition will be used to output stubs for other languages.

Ideally a single file contains a single declaration.

## Overall flow

declaration file --[definition reader]-> API description *.api.json --[language writer]-> language specific stubs

The heart of the flow is the API description json file format which fully describes APIs.

* Various definition readers can be written to read various API description languages and output API description json.
* Various language writers can be written to read the API description json and output language specific stubs.

The standard *.api.json format allows:

* A single declaration file can be used to define stubs in multiple languages.
* API definitions to be translated between definition languages by building various definition readers and definition writers.
* The definition reader to determine how the definition file is translated to the API description *.api.json file.
* The language writer to determine how the API description *.api.json is translated to language specific stubs.

The goals are:
* All other specification languages are translated to the standard *.d.ts format. 
* There are standard writers for each language.

The accomplishment of these two goals will ensure that it is obvious how standard APIs are translated to the human readers and writers of the *.d.ts files. Standard writers will produce standard APIs across languages that can follow the language specific conventions and are easy to pick up or switch between languages.

## Strict Reader and Writer format

Definition of how readers and writer are names and used.

* [language].definition_reader.ts [input definition file] [output *.api.json file]

* [language].language_writer.ts [input *.api.json file] [output directory]



## Strict Declarations
What is supported in declarations will be strict.

Only what is positively supported will be allowed, any deviation will result in errors.



### Supported Declarations

What specific declarations are supported?

How are the specific declarations converted to language specific stubs?

* interface
* class

### Required Data from Declarations

* Full Name
    * Entire path to the class, member, function etc..
    * The full name serves as a unique identifier for this API.
        > Example: namespace.class.member
    * It is invalid for a full name to be declared more that once.
* types for arguments and return types.
* Documentation Comments
* 


## Testing and verification

There are two things to test: readers and writers.

Each test will consist of the *.d.ts file the *.api.json file, and the output file in the expected language.

A simple text compare with the previous output of the *.d.ts file is sufficient to see that the test passes.

Each test will demonstrate a specific piece of functionality thus also serving as system documentation.

Updating tests is done by running the reader and write pipeline on the specified *.d.ts file.


## Implementation Plan

The initial implementation:

 >Focus solely on creating a reader for *.d.ts files and a language writer for .d.ts files this will ensure that any reader can be translated to a *.d.ts file and that all required information was captured in the readers output *.api.json file.


Refining Implementation:

> Focus on better refining the *.api.json and *.d.ts file to capture desireable specifications for an API in any language.






