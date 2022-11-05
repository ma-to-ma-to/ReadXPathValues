import * as readDirectories from './readDirectories.mjs';
import * as helper from './helper.mjs';

const entry = async (path, xPath) => {

  // handle edge case where either path or xpath is not supplied
  if (helper.isEmpty(path) || helper.isEmpty(xPath)) {
    throw new Error("Expected two arguments.");
  }

  const fileList = await readDirectories.composeFileList(path);
  const valueList = await readDirectories.composeValueList(fileList, xPath);
  return valueList;
}


export { entry };
