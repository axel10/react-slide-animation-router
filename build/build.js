const fs = require('fs');
const path = require('path');
const {exec} = require('child_process')

const baseDir = path.resolve(__dirname, '../');
const distDir = path.resolve(baseDir, 'dist')

if (!fs.existsSync(distDir)){
  fs.mkdirSync(distDir)
}

fs.copyFileSync(path.resolve(baseDir,'package.json'),path.resolve(distDir,'package.json'))
fs.copyFileSync(path.resolve(baseDir,'readme.md'),path.resolve(distDir,'readme.md'))
fs.copyFileSync(path.resolve(baseDir,'src/index.tsx'),path.resolve(distDir,'index.tsx'))

exec(`tsc ${distDir}/index.tsx`)