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

## Installation & Contributing

Currently, Wand is constructed using [Grunt](http://gruntjs.com/), which relies on [`npm`](https://www.npmjs.com/). For custom styles, Wand uses the Ruby Sass compiler. To install it on your computer, follow these steps:

#### Ruby/Sass

1. Make sure that you have ruby installed. For help, see this [how-to guide](https://github.com/codeforamerica/howto/blob/master/Ruby.md)
2. Install the proper ruby gem: `gem install sass`

#### Everything else

1. Fork the project with your own account
2. Clone the fork on your computer `git clone git@github.com:USERNAME/wand.git`
3. Install the dependencies `npm install`
4. Install the Grunt command line tools `npm install -g grunt-cli` (might require `sudo`)
5. Run `npm start` command to build the javascript from `src`. This will also load a server at `localhost:4000`. To view the working example, visit `localhost:4000/examples/`.
6. Make changes, then submit a pull request to this repository!

## Testing

Tests can be found in the `test` directory. To run tests, use `npm test`.
