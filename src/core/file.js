'use strict';
/**
 * Manipulates files access
 * @class {File}
 */
class File {

    constructor(path) {
        this.fullPath = path;
        var splittedPath = path.split('/');
        this.file = splittedPath.pop();
        this.directory = splittedPath.join('/');
        this.fs = require("fs-extra");
		this.fs.ensureFileSync(this.fullPath);
    }
    
    /**
     * Get the full file path
     * @return {string}
     */
    get filePath() {
        return this.fullPath;
    }
    
    /**
     * Get the directory where the file is
     * @return {string}
     */
    get dirPath() {
        return this.directory;
    }
    
    /**
     * Get the file name
     * @return {string}
     */
    get fileName() {
        return this.file;
    }

    /**
     * Appends content to end of file
     * @param {string} content - Content to be written to the file
	 * @return {void}
     */
    append(content) {
        this.fs.appendFileSync(this.fullPath, `${content}\n`);
    }

    /**
     * Writes the given content to a file. Ovewrites if it already has any content.
     * @param {string} content - Content to be written to the file
	 * @return {void}
     */
    write(content) {
        this.fs.outputFileSync(this.fullPath, `${content}\n`);
    }

    /**
     * Reads the file content
     * @return {string}
     */
    read() {
        return this.fs.readFileSync(this.fullPath, 'utf8');
    }
}
module.exports = File;