const fs = require("fs");

class FileConverter {

    /**
     * 
     * @param {String} file Either the filename or a string to convert.
     * @param {Boolean} isFileContents Optional, defaults to false. If true,
     *  treats the file parameter like the file contents, not the file name.
     */
    constructor(file, isFileContents = false) {
        this.file = file;
        this.isFileContents = isFileContents;
        this._result = null;
    }

    /**
     * Converts the CSV file to a TXT file.
     * 
     * @param {Boolean} skipFirst Optional, defaults to true. If true, will
     *  skip the first line of the file, the assumption being that the first 
     *  line is headings.
     */
    convert(skipFirst = true) {
        let result = "";
        const fileContents = this._getFileContents();
        const splitFileContents = fileContents.split("\n");
        let line = "";
        let convertedLine = "";

        for(let x = skipFirst ? 1 : 0; x < splitFileContents.length; x++) {
            line = splitFileContents[x];

            if(line.trim() === "") {
                continue;
            }

            convertedLine = this._convertLine(line);

            if(convertedLine) {
                result += this._convertLine(line) + "\n";
            } else {
                console.warn(`Could not convert line ${x}: ${line}`);
            }
        }

        this._result = result;
    }

    /**
     * Converts a given line, and returns the converted line.
     * 
     * @param {String} line The CSV line to convert.
     * @returns {String}
     */
    _convertLine(line) {
        const splitLine = line.split(",");
        const sourceURL = this._cleanURL(splitLine[0]);
        const destinationURL = splitLine[1];

        if(!sourceURL || !destinationURL) {
            return null;
        }

        return `${sourceURL}?$ ${destinationURL}`;
    }

    /**
     * Removes the https:// or http:// from a given URL.
     * 
     * @param {String} url
     * @returns {String} 
     */
    _cleanURL(url) {
        if(url) {
            return url.replace(/^http[s]?:\/\//, "");
        } else {
            return null;
        }
    }

    _getFileContents() {
        if(this.isFileContents) {
            return this.file;
        }

        return fs.readFileSync(this.file).toString();
    }

    get result() {
        return this._result;
    }

}

module.exports = FileConverter;