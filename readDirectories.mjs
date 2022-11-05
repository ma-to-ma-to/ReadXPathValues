import * as fs from 'fs/promises';
import * as helper from './helper.mjs';
import xml2js from 'xml2js';

// searches the given path and all subdirectories for XML files, adds their paths to an array for processing
const composeFileList = async (path) => {

  const fileList = new Array;
  const pathStats = fs.stat(path);

  if ((await pathStats).isFile() && path.substr(path.length - 3) == "xml") {
    fileList.push(path);
    return fileList;
  }

  if ((await pathStats).isDirectory()) {
    const subdirectories = new Array(path);
    while (subdirectories.length > 0) {
      try {
        const dir = await fs.opendir(subdirectories.pop());
        for await (const dirent of dir) {
          if (dirent.isDirectory()) {
            subdirectories.push(dir.path.concat("/", dirent.name));
          } else if (dirent.isFile() && dirent.name.split(".")[1] == "xml") {
            fileList.push(dir.path.concat("/", dirent.name));
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  if (fileList.length == 0) {
    throw new Error("No XML files found.");
  }

  return fileList;
}

// takes the previously created array of file paths and parses their XML data in search of the XPath value
const composeValueList = async (fileList, xPath) => {

  const valueList = new Array;

  const xPathArray = xPath.split("/");
  if (helper.isEmpty(xPathArray[0])) {
    xPathArray.shift();
  }

  for await (const file of fileList) {
    const xml = await fs.readFile(file);

    const parser = new xml2js.Parser();
    const data = await parser.parseStringPromise(xml)
      .catch(function (err) {
        throw new Error("XML file: " + file + " could not be parsed.\n" + err.message);
      });

    let dataPointer = data;
    for (let i=0; i<xPathArray.length; i++) {
      if (!dataPointer.hasOwnProperty(xPathArray[i])) {
        dataPointer = null;
        break;
      }
      dataPointer = dataPointer[xPathArray[i]];
    }

    valueList.push({"path": file, "value": dataPointer});
  }


  return valueList;
}

export { composeFileList, composeValueList };
