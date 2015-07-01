# wand

Let's make wizards!

## What is it?

A common problem in civic technology is a need to build simple choose-your-own adventure style web interfaces. Users might need to know how or if they can apply for a permit or a quick answer to a screening question. Often, the current way to answer these questions is to read dense printed documents, when a simpler and easier approach might be to answer questions and get a response based on those answers.

## What's the status?

Wand is *pre-alpha* software in very early development.

## Current thinking about app organization

We are thinking of grouping wand into three primary components:

    + The specification
    + The engine
    + The editor

#### The specification

The specification for a wand page is being hashed out in [the wiki](https://github.com/codeforamerica/wand/wiki/Wand-Specification----Individual-Question-Node-Page). The specification lays out the needed requirements for the wand engine to properly render a given page.

#### The engine

The wand engine takes a wand specification and turns it into a page.

#### The editor

The wand editor loads in a specification and allows a non-technical end-user to edit the details of that page.
