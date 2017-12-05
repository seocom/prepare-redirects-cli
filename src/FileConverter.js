const fs = require("fs");

class FileConverter {

    /**
     * 
     * @param {String} fileName 
     */
    constructor(fileName) {
        this.fileName = fileName;
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
        const fileContents = fs.readFileSync(this.fileName).toString();
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

    get result() {
        return this._result;
    }

}

module.exports = FileConverter;