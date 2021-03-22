const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserImages = document.querySelector('#images');
const previewImages = document.querySelector('.ad-form__photo');

const imageSize = {
  width: 70,
  height: 70,
}

const setImageInPreview = (fileChooser, preview, isImg) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();


      reader.addEventListener('load', () => {
        if (isImg) {
          preview.src = reader.result;
          preview.width = imageSize.width;
          preview.height = imageSize.height;
          preview.style.margin = '0  -15px';
        } else {
          preview.style.backgroundImage = `url(${reader.result})`;
          preview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  });
}

setImageInPreview(fileChooserAvatar, previewAvatar, true);
setImageInPreview(fileChooserImages, previewImages, false);