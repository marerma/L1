// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, 
// который разрешается с данными об изображении, когда оно загружено. Когда говорится "промис разрешается с данными об изображении", 
// это означает, что промис должен быть успешно выполнен (resolved) 
// с данными об изображении после того, как изображение будет загружено.

// фетчим урл и по статусу события либо резолвим, если загружено изображение, или кидаем ошибку
// в функции создаем дом-элемент image и его возвращаем с установленным src

function loadImage(url) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Ошибка загрузки ${url}`));
  })
}

// Вариант функции, который возвращает данные изображения в виде объекта, если изображение успешно загружено, или ошибку, если запрос не успешен
function loadImageData(url) {
  return new Promise(function(resolve, reject) {
    let image = new Image();
    
    image.addEventListener('load', () => {
      resolve({
        width: image.width,
        height: image.height,
        src: url,
      });
    });

    image.addEventListener('error', () => {
      reject(new Error('Failed to load the image'));
    });

    image.src = url;
  })
}

// функция фетчит урл, получает объект блоб.
// после того, как получены данные об изображении, формируем уникальный урл
// в dom в нужный элемент устанавливаем в атрибут src полученный урл

function loadImage2 (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Can not fetch the url');
        }
        return res.blob();
      })
      .then(image => {
        const imgUrl = URL.createObjectURL(image);
        resolve(imgUrl);
      })
      .catch(error => reject(error));
  })
}

// реализация второго варианта через async await
async function loadImage3 (url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  catch (error) {
    console.error(error);
  }
}
