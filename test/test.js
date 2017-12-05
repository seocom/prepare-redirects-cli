const assert = require("assert");
const FileConverter = require("./../src/FileConverter");

let converter = new FileConverter(`
https://taylorandrew.com/contact/information/,https://taylorandrew.com/request-info/
https://taylorandrew.com/2009/07/new-photoshoot-with-jake-garn/,https://taylorandrew.com/new-photoshoot-with-jake-garn/
https://taylorandrew.com/2017/09/8-characteristics-of-a-quality-barber/,https://taylorandrew.com/8-characteristics-of-a-quality-barber/
https://taylorandrew.com/2017/03/the-history-of-hair-painting/,https://taylorandrew.com/the-history-of-hair-painting/
`, true);

describe('FileConverter', function() {
    describe("_cleanURL()", function() {
        it("should remove http:// from the front of a URL", function() {
            // Add more arrays to this array for more tests. The first element
            // in the array is the raw string to clean, and the second element
            // is what the function should output.
            const tests = [
                ["http://testing.com", "testing.com"],
                ["http://localhost", "localhost"],
                ["http://testing.com/test", "testing.com/test"]
            ];

            tests.forEach((test) => {
                const result = converter._cleanURL(test[0]);

                assert.equal(result, test[1]);
            });
        });

        it("should remove https:// from the front of a URL", function() {
            // Add more arrays to this array for more tests. The first element
            // in the array is the raw string to clean, and the second element
            // is what the function should output.
            const tests = [
                ["https://testing.com", "testing.com"],
                ["https://localhost", "localhost"],
                ["https://testing.com/test", "testing.com/test"]
            ];

            tests.forEach((test) => {
                const result = converter._cleanURL(test[0]);

                assert.equal(result, test[1]);
            });
        });
    });

    describe("_convertLine()", function() {
        it("should convert a given line correctly", function() {
            const tests = [
                [
                    "http://testing.com/test/,http://testing.com/redirect", 
                    "testing.com/test/?$ http://testing.com/redirect"
                ],
                [
                    "http://testing.com/test/foobar/,http://testing.com/redirect/", 
                    "testing.com/test/foobar/?$ http://testing.com/redirect/"
                ],
                [
                    "http://testing.com,http://testing.com/redirect/", 
                    "testing.com$ http://testing.com/redirect/"
                ]
            ];

            tests.forEach((test) => {
                const result = converter._convertLine(test[0]);

                assert.equal(result, test[1]);
            });
        });

        it("should return null for an empty line", function() {
            assert.equal(converter._convertLine(""), null);
        });
    });
});
