# Prepare Redirects CLI

Simple Node CLI tool for preparing a CSV list of redirects to the format desired
by WPEngine so that they can mass import it.

See
[Section #3 of this WPEngine article](https://wpengine.com/support/redirect/)
for more information. This tool is used to generate the `.txt` files required 
for the mass import outliend there.

*Note:* Will skip the first line, under the assumption that it is a header line.

---

  - [Installation](#installation)
  - [Usage](#usage)
  - [CSV Formatting](#csv-formatting)
  - [Development](#development)
    - [Unit Tests](#unit-tests)

## Installation

This tool is available via [NPM](https://www.npmjs.com). You can install it
with:

```
npm i -g @seocom/prepare-redirects-cli
```

## Usage

```
wpengine-prepare-redirects [filename.extension]
```

**Example:**

```
wpengine-prepare-redirects redirects.csv
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

## CSV Formatting

At present, there are a few required formatting conditions for the CSV file for
this tool to work as expected.

  - It must use newline (`\n`) characters to separate rows
  - It must have the source URL in the 0th column, and the destination on the 1st
  - The first row must not contain a valid redirect, as it will be ignored

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