import fs from 'fs';
import { analyze } from '@projectwallace/css-analyzer'

function getFileName(url) {
  return url.replace(/css/ig, 'json');
}

export async function createAnalysis(cssFolderPath = 'css') {
  const files = await fs.promises.readdir(cssFolderPath);

  const promises = files.map(async filePath => {
    const fullFilePath = `${cssFolderPath}/${filePath}`;
    const css = await fs.promises.readFile(fullFilePath, 'utf-8');
    const analysis = analyze(css);
    const fileName = getFileName(fullFilePath);

    const jsonFolderPath = './json';

    if (!fs.existsSync(jsonFolderPath)){
      fs.mkdirSync(jsonFolderPath);
    }

    await fs.promises.writeFile(fileName, JSON.stringify(analysis, null, 2));

    return {
      fileName: filePath,
      analysis
    };
  });

  return Promise.all(promises);
}


