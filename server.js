const chokidar = require('chokidar');
const sass = require('sass');
const path = require('path');
const fs = require('fs');

//监听的文件
console.log('我开始自动编译SCSS文件');
let timer = null;
chokidar.watch('**/*.scss', {
}).on('change', (file) => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    const { dir, name } = path.parse(file);
    sass.render({
      file: file
    }, function (err, result) {
      if (!err) {
        const newFile = `${dir}/${name}.wxss`;
        fs.writeFileSync(newFile, result.css);
        console.log(`updated ${newFile}  at: ${new Date().toLocaleTimeString()}`);
      }
    });
  }, 200)

});


