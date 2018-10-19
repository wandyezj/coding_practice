# Typescript Definition Language

The goal: be able to define APIs in typescript and use these definitions to generate stubs for another language.

All code will be written in typescript and executed with [ts-node](https://www.npmjs.com/package/ts-node)
This is to keep things consistent and maintainable.

## Goals

### Language Reflection

APIs are defined once and reflected in multiple languages.

* APIs contracts are defined once in a typescript definition language .d.ts file those contracts are reflected in multiple languages.
* API contracts defined in other languages may be translated (by writing a custom reader for the language) to the typescript definition language .d.ts files to onboard to the new pipeline.

### Simple Definition

There is one correct way to define API contracts that requires minimal input from developers.

* Expected output from definitions is intuitive and obvious.
* Common design patterns are supported to enable common functionality.
    * events
    * checking if an API (or a Set of APIs) is supported.


### Automatic Documentation

Documentation should be part of the API definition, including examples.

* Minimize the amount of boilerplate that developers need to write for documentation.
* Provide easy ways for developers to give examples of API usage.
* Automatically generate end used documentation.
* Allow this documentation to be reflected across languages.

### Design Guidance

Defining easy to consume APIs is challenging, allow automatic design guidance to avoid common pitfalls.

* Take experts experience and encode it to make it available to everyone.

Example Patterns:
* Common standard naming conventions to make things less confusing for API consumers.
* Every SetX must be paired with a GetX for convenience and testability (it's ok to have a readonly GetX without a SetX)
* Do not allow two functions with nearly the same name except that one ends in an s, as this can be confusing and result in bugs that waste developers time.

### Testing Stubs

Provide support for automatic test stub generation.

* Allow tests to be the definition, documentation, and enforcement of the API contract.
* Tests are ideally defined once and translated to other languages allowing each implementation to have the same test coverage.

### Maintainability

* Detect changes in API surface.
    * Allow automatic versioning
    * Mitigate the risk of unintentional compatibility regressions.

* Provide support for marking APIs as:
    * Public
        * All APIs are public by default.
    * Internal
        * APIs intended for consumption only by first party developers.
    * Beta
        * API is in preview and subject to change or complete removal.
    * Deprecated
        * API is slated to be removed.


## Existing Systems

* [API Extractor](https://github.com/Microsoft/web-build-tools/wiki/API-Extractor)
    * API Extractor focuses on extracting existing typescript APIs verses defining new APIs.
    * The goal of Typescript Definition Language is to be able to automatically generate multiple APIs from a single definition.
    * API Extractor could be useful on a language output of Typescript.

* [tslint](https://palantir.github.io/tslint/)
    * Enables writing of custom rules to check typescript code and provides highlighting in VS Code.

* [Typescript Compiler Architecture](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview)

* [Typescript Extracting JsDoc](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
    * See: Using the Type Checker

* [Typescript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
    * Access to a reader that can read the typescript files.

* [ts-node](https://www.npmjs.com/package/ts-node)
    * API to parse the .d.ts file

* [TypeDoc](https://github.com/TypeStrong/typedoc)
    * Documentation generator for TypeScript projects.

## General Project Reference

*[Enabling ts-node debugging](https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a)

*[AST explorer](https://astexplorer.net)

## General Layout

Typescript declaration files *.d.ts will be used to mark up the API definition.

The API definition will be used to generate API description *.json files which will be consumed to output stubs for other languages.

Ideally a single file contains a single declaration.

## Overall flow

**API Declaration File** --[**Definition Reader**]-> **Standard API Description JSON** --[**Language Writer**]-> **language specific stubs**

The heart of the flow is the **Standard API Description JSON** file format which fully describes APIs.

* **Definition Readers** can be written to read different **API Declaration File** formats and output **Standard API Description JSON**.
* **Language Writers** can be written to read the **Standard API Description JSON** and output different language specific stubs.

The **Standard API Description JSON** format allows:

* A single **API Declaration File** can be used to define stubs in multiple languages.
* **API Declaration File** formats to be translated to different **API Declaration File** formats by building specific **Definition Readers** and **Definition Writers**.
* The **Definition Reader** to determine how the definition file is translated to the **Standard API Description JSON** file.
* The **Language Writer** to determine how the **Standard API Description JSON** is translated to language specific stubs.

The goals are:
* All other specification languages are translated to a **Standard API Declaration Format**.
    * Via standard **Definition Readers** to translate **API Declaration File**s to **Standard API Description JSON**
    * This makes it easier for everyone to understand the structure of the API.
* There are standard **Definition Readers** for each language.

The accomplishment of these two goals will ensure that it is obvious how standard APIs are translated to developers reading and writing of the **Standard API Declaration Format** files. Standard writers will produce standard APIs across languages that can follow the language specific conventions and are easy to pick up or switch between languages.

## Strict Reader and Writer format

Definition of how readers and writer are names and used.

* [language].definition_reader.ts [input definition file] [output *.api.json file]

* [language].language_writer.ts [input *.api.json file] [output directory]






## **Standard API Description JSON** file format

* Have the extension .api.json
* Contains entities at the most basic level, have one per file.

Entity files will be reassembled to produce the overall API files at the highest level (the level is language dependent)

### Required Data from Declarations

* Full Name
    * Entire path to the class, member, function etc..
    * The full name serves as a unique identifier for this API.
        > Example: namespace.class.member
    * It is invalid for a full name to be declared more that once.
* strong types for arguments and return types.
* Documentation Comments


## **Standard API Declaration Format**

The **Standard API Declaration Format** will use the typescript declaration *.d.ts file format with some additions.

* Stronger typing that javascript typing will be added to support strongly typed languages.
    * It's generally valid to go from more strict to less strict typing.
    * This is to help make developer intentions clear.

### Strict Declarations
What is supported in declarations will be strict.

Only what is positively supported will be allowed, any deviation will result in errors.

### Supported Declarations

What specific declarations are supported?

How are the specific declarations converted to language specific stubs?

* namespace
* interface
* class
* property
* function


## Testing and verification

There are two things to test: readers and writers.

### Testing Overview

Since all readers and writers must be deterministic a simple test setup of ensuring a specific input file produce an expected output file is sufficient for verification.

Each individual test will demonstrate a specific piece of functionality, thus also serving as system documentation.

Updating tests is done by updating the input and expected output file.

Any scenarios that is not positively supported (has a test for it) should result in failure, in this case the output is an error code from the reader and writer with a message saying specifically what is unsupported.

Understanding test failures is as easy as using a text diffing tool on the output and expected output.

To simplify looking at multiple test failures output and expected output files will be named the same but placed in directories next to each other (this allows folder compares).

### Testing Readers

* Input: an API Declaration file
* Output: the **Standard API Description JSON**
* Verification: check that the output exactly matches the expected output.

### Testing Writers

* Input: **Standard API Description JSON**
* Output: the language specific stubs.
* Verification: check that the output exactly matches the expected output.


## Technical Solutions

* ts-lint
    * Does this work with declaration files?
* typescript compiler

## Implementation Plan

The initial implementation:

 >Focus solely on creating a reader for *.d.ts files and a language writer for .d.ts files this will ensure that any reader can be translated to a *.d.ts file and that all required information was captured in the readers output *.api.json file.


Refining Implementation:

> Focus on better refining the *.api.json and *.d.ts file to capture desireable specifications for an API in any language.

