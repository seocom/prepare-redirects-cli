# Prepare Redirects CLI

Simple Node CLI tool for preparing a CSV list of redirects to the format desired
by WPEngine so that they can mass import it.

See
[Section #3 of this WPEngine article](https://wpengine.com/support/redirect/)
for more information.

*Note:* Will skip the first line, under the assumption that it is a header line.

---

  - [Installation](#installation)
  - [Usage](#usage)
  - [Development](#development)
    - [Unit Tests](#unit-tests)

## Installation

First, clone this project to your local machine.

Once that's complete, `cd` into the project, and run the following:

```
npm i
npm link
```

The first line will install all dependencies, and the second line will install
the CLI tool so you can access it from your terminal.

## Usage

```
prepare-redirects [filename.extension]
```

**Example:**

```
prepare-redirects redirects.csv
```

Will look in the current working directory for a file that matches the given
name. The file must contain plaintext comma separated values, wherein the first
column is the source of the redirect, and the second column is the destination
for the redirect.

Will put the converted output in `[filename].csv`, so for example, running

```
prepare-redirects redirects.csv
```

Would produce a file in the same directory called `redirects.txt`, which can be
sent to WPEngine.

## Development

### Unit Tests

This tool uses the Mocha unit testing tool. See
[their website](https://mochajs.org/) for more information on installing the 
tool and using it.

To run all unit tests, `cd` into project root, make sure you have all NPM 
dependencies installed, and run:

```
mocha
```

All tests are currently contained in the `test/test.js` file.