import path from 'path';
import os from 'os';
import fs from 'fs';

const copyDir = (src, dest, callback) => {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err);
        return;
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item);
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);

            if (stat.isFile()) {
              // file, copy directly
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
            } else if (stat.isDirectory()) {
              // directory, recursively
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      // If the target directory does not exist, create it
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};

const initCCLibrariesDir = () => {
  let homedir = os.homedir();
  let ccDir = path.join(homedir, './CodecraftPC');
  let libraryDir = path.join(homedir, './CodecraftPC/libraries');
  let pkgsDir = path.join(homedir, './CodecraftPC/pkgs');
  let imgCacheDir = path.join(homedir, './CodecraftPC/imgCache');
  let configDir = path.join(homedir, './CodecraftPC/config');

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

  if (!fs.existsSync(pkgsDir)) {
    fs.mkdirSync(pkgsDir, {
      recursive: true
    });
  }

  if (!fs.existsSync(imgCacheDir)) {
    fs.mkdirSync(imgCacheDir, {
      recursive: true
    });
  }

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, {
      recursive: true
    });
  }

  let buildTempPath = path.join($dirname, '../../buildTemp');
  if (!fs.existsSync(buildTempPath)) {
    let buildPath = path.join($dirname, '../../buildPath');
    copyDir(buildPath, buildTempPath);
  }

}

const getCCLibrariesDir = () => {
  let homedir = os.homedir();
  let libraryDir = path.join(homedir, './CodecraftPC/libraries');
  return libraryDir
}

const getCCPkgsDir = () => {
  let homedir = os.homedir();
  let libraryDir = path.join(homedir, './CodecraftPC/pkgs');
  return libraryDir
}

const getImgCacheDir = () => {
  let homedir = os.homedir();
  let libraryDir = path.join(homedir, './CodecraftPC/imgCache');
  return libraryDir
}

const getConfigDir = () => {
  let homedir = os.homedir();
  let libraryDir = path.join(homedir, './CodecraftPC/config');
  return libraryDir
}

export {
  initCCLibrariesDir,
  getCCLibrariesDir,
  getCCPkgsDir,
  getImgCacheDir,
  getConfigDir
}