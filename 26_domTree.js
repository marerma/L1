// Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента, 
// и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

// dfs обход дерева вглубину

function traverseDOM (node, callback) {
  callback(node); // вызываем переданный коллбек на элементе

  // функция для проверки, есть ли дети - берем только элементы (без текстовых узлов и комментариев)
  const hasChildren = (el) => el.children.length > 0; 

  if (hasChildren(node)) {
    const childrenElement = node.children;

    //обходим коллекцию детей и на каждом вызываем рекурсивно функцию обхода
    for (const child of childrenElement) {
      traverseDOM(child, callback)
    }
  }
}


// bfs обход дерева в ширину
function traverseDOMbfs (node, callback) {
  // функция для проверки, есть ли дети - берем только элементы (без текстовых узлов и комментариев)
  const hasChildren = (el) => el.children.length > 0; 

  // создаем очередь для хранения элементов
  const nodeQueue = [];
  nodeQueue.push(node) // кладем туда первыйэлемент

    //пока очередь не пуста, берем первый элемент и проходим по его детям (если они есть) и кладем их в очередь
    while (nodeQueue.length) {
      let currentNode = nodeQueue.shift();
      if (hasChildren(currentNode)) {
      const childrenElement = currentNode.children;
      for (const child of childrenElement) {
        nodeQueue.push(child); 
      }
      callback(currentNode) // вызываем переданный коллбек на элементе
    }
  }
}
