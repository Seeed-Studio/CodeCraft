import path from 'path';
import os from 'os';
import fs from 'fs';

const initCCLibrariesDir = () => {
  let homedir = os.homedir();
  let ccDir = path.join(homedir, './CodecraftPC');
  let libraryDir = path.join(homedir, './CodecraftPC/libraries');

  if (!fs.existsSync(ccDir)) {
    fs.mkdirSync(ccDir, {
      recursive: true
    });
  }

  if (!fs.existsSync(libraryDir)) {
    fs.mkdirSync(libraryDir, {
      recursive: true
    });
  }
}

const getCCLibrariesDir = () => {
  let homedir = os.homedir();
  let libraryDir = path.join(homedir, './CodecraftPC/libraries');
  return libraryDir
}

export {
  initCCLibrariesDir,
  getCCLibrariesDir
}