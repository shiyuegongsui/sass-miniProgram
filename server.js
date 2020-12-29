const chokidar = require('chokidar');
const sass = require('sass');
const path = require('path');
const fs = require('fs');

//监听的文件
console.log('我开始自动编译SCSS文件');
chokidar.watch('**/*.scss', {
}).on('change', (file) => {
  const { dir, name } = path.parse(file);
  sass.render({
    file: file
  }, function (err, result) {
    if (!err) {
      const newFile = `${dir}/${name}.wxss`;
      fs.writeFile(newFile, result.css, function (err) {
        if (!err) {
          console.log(`updated ${newFile}`);
        }
      });
    }
  });
});


