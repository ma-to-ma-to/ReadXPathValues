# ReadXPathValues
When given an XPath and a local directory or file, this will search full directory and find the XPath value for all existing XML files. This program was made as an exercise.

## How to Use
The included requirements have asked for a "module whose default export should be an asynchronous function which crawls the directory tree and parses the XML files it finds." My assumption is it will be assessed by a grading program, which would import my solution. I have included a script that allows for my solution to be run manually from the command line:
1. Download or clone this repository.
2. Make sure Node.js is installed on your machine.
3. Use a command line interface to navigate to the directory where you have put the local repository.
4. Use the following command to install necessary packages for the program to work:
    * `npm i`
5. Run with the following command:
    * `npm run test [XXXXXX] [YYYYYY]`
    * Replace `[XXXXXX]` with the path of the local directory in which you wish to search for XML files.
    * Replace `[YYYYYY]` with the XPath of the values for which you wish to search.
6. The console will display the found values as in the example below.

<br/>
<br/>
<p align="center">
  <img src="https://i.imgur.com/tAa1vsb.png"/>
</p>
<br/>
<br/>

## Tips
* Don't forget to supply the two arguments when running from the command line.
* The first argument can be a directory or just a single file. In either case, it needs to be valid and existing on your machine.
* Make sure that all XML content is well-formed.
* I have only included functionality for very simple XPaths - element names separated by forward slashes.
