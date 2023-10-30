const Jimp = require("jimp");
const path = require("path");

const sizePicture = async (pathImg, filename) => {
  const avatarPath = path.resolve("public", "avatars");
  const newPathAvatar = path.join(avatarPath, filename);

  Jimp.read(pathImg, (err, image) => {
    if (err) {
      throw new Error("Error read avatars path ", err);
    } else {
      image.resize(250, 250).write(newPathAvatar, (writeErr) => {
        if (writeErr) {
          throw new Error("Error for change size image", writeErr);
        } else {
          console.log("Avatar sucsessful add", filename);
        }
      });
    }
  });
};

module.exports = {
  sizePicture,
};
