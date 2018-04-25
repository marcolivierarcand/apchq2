const fs = require('fs');
const path = require('path');
const directory = path.resolve(__dirname, '../../dist');
const colors = require('colors');

fs.readdir(directory, (err, files) => {
  if (err) throw err;

	if (files.length){
		console.log(`[DEVKIT] => There is ${files.length} files in folder for deletion`.green)
	} else {
		console.log(`[DEVKIT] => There are no files in the dist folder to remove.`.green)
	}

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
			console.log(`[DEVKIT] => "${file}" has been removed !`.green)
      if (err) throw error;
    });
  }
});
