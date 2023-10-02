// Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await 
// для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

// функция принимает массив асинхронных функций и возвращает результат выполнения,
// если все успешно зарезолвятся с использванием Promise.all

async function getAllResults (fnArrays) {
  try {
    const result = await Promise.all(fnArrays);
    return result;
  }
  catch (error) {
    console.error(error);
  }
}

// пример обычной функции с использованием async-await: отправляем запрос на урл, обрабатываем ответ в json, возвращаем данные

async function getRequest (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}


// const test = () => {
//   return new Promise((resolve) => {
//     setTimeout(()=> {
//       resolve(3);
//     }, 1000)
//   })
// }

// const array = [getRequest('https://jsonplaceholder.typicode.com/posts?_limit=3'), test()]
// const a = async () => await getInfo(array);
// a().then(res => console.log(res))