# Typescript Definition Language

The goal: be able to define APIs in typescript and use these definitions to generate stubs for another language.


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

## Testing and verification

There are two things to test: readers and writers.

Each test will consist of the *.d.ts file the *.api.json file, and the output file in the expected language.

A simple text compare with the previous output of the *.d.ts file is sufficient to see that the test passes.

Each test will demonstrate a specific piece of functionality thus also serving as system documentation.

Updating tests is done by running the reader and write pipeline on the specified *.d.ts file.


## Implemetation Plan

The initial implementation:

 >Focus solely on creating a reader for *.d.ts files and a language writer for .d.ts files this will ensure that any reader can be translated to a *.d.ts file and that all required information was captured in the readers output *.api.json file.


Refining Implementation:

> Focus on better refining the *.api.json and *.d.ts file to capture desireable specifications for an API in any language.




