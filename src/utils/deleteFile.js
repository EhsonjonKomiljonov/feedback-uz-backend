import fs from 'fs';

export const deleteFile = (imagePath) => {
  fs.unlink(process.cwd() + imagePath, (err) => {
    console.log(err);
  });
};
