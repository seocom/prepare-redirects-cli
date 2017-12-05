#! /usr/bin/env node

const fs = require("fs");
const args = require("really-simple-args")();
const FileConverter = require("./FileConverter");
const basePath = process.cwd();

// Grab the filename from the arguments.
const filename = args.getArgumentByIndex(0);

// If the user didn't specify a filename, notify them and quit.
if(!filename) {
    console.warn("No filename specified. Please specify a filename to convert using 'prepare-redirects filename.csv'");
    process.exit(1);
}

// Next, check to make sure the file exists.
const fullPath = `${basePath}/${filename}`;

if(!fs.existsSync(fullPath)) {
    console.warn("The file specified does not exist.");
    process.exit(2);
}

// Compute the filename without the extension
const filenameNoExt = filename.replace(/\.(?:[a-z]|[A-Z])*$/, "");

// If the file exists, let's read it and convert it.
const converter = new FileConverter(fullPath);

converter.convert();

// Finally, write out the new file.
fs.writeFileSync(`${basePath}/${filenameNoExt}.txt`, converter.result);

// And we're done.
process.exit(0);

