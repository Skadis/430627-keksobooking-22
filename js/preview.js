const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const startImageSize = {
  width: 40,
  height: 44,
}

const newImageSize = {
  width: 70,
  height: 70,
}

const setImageInPreview = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (preview.tagName === 'IMG') {
        preview.src = reader.result;
        preview.width = newImageSize.width;
        preview.height = newImageSize.height;
        preview.style.margin = '0  -15px';
      } else {
        preview.style.backgroundImage = `url(${reader.result})`;
        preview.style.backgroundSize = 'cover';
      }
    });

    reader.readAsDataURL(file);
  }
};

const resetPreview = (preview) => {
  if (preview.tagName === 'IMG') {
    preview.src = 'img/muffin-grey.svg';
    preview.width = startImageSize.width;
    preview.height = startImageSize.height;
    preview.style.margin = '0';
  } else {
    preview.style.backgroundImage = '';
  }
};

export { setImageInPreview, resetPreview }
