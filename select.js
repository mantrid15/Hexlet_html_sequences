
const select = (tagName, html) =>
		reduce((element, acc) => {
			const newAcc = hasChildren(element) ? concat(select(tagName, children(element)), acc) : acc;

			return is(tagName, element) ? consList(element, newAcc) : newAcc;
		}, l(), html);



/**
 *
 * @param {Все что нужно сделать — узнать, есть ли среди этих чисел хотя бы один ноль.:
Прежде чем разбирать код, опишем алгоритм, по которому работает функция hasZero:
Рекурсивно обходим список:
  - Если список закончился, а 0 не найден, то возвращаем false (guard expression).
  - Если текущий элемент — не список, то проверяем, равен ли он нулю.
  - Если равен нулю, то возвращаем true.
  - Если текущий элемент — список, то запускаем hasZero рекурсивно, передав туда текущий элемент.
  - Если результат этого вызова true, то возвращаем true.
  - Если не сработали предыдущие терминальные условия, проверяем следующий элемент списка.
Такой обход дерева называется обход в глубину.
Сначала мы опускаемся до самого дна самой левой ветки,
затем ветки чуть правее и так далее пока не дойдем до конца.} list
 */
/*const hasZero = (list) => {
	if (isEmpty(list)) {
		return false;
	}
	const current = head(list);
	const rest = tail(list);
	if (!isList(current)) {
		if (current === 0) {
			return true;
		}
	} else if (hasZero(current)) {
		return true;
	}
	return hasZero(rest);
};

console.log(hasZero(l(1, 3, l(5, l(9), 3), 10)));
console.log(hasZero(l(1, l(l(5, 100), 0), 10)));
/!** ==================================================== *!/
const tree = l(l(1, 2), l(3, l(4, 5), 6));
const tree2 = l(1, l(2, 3)); // <p> <b> hello </b> <i>friend</i> </p>// 3

const countElements = (tree3) => {
	if (!isList(tree3)) {
		return 1;
	}
	if (isEmpty(tree3)) {
		return 0;
	}
	return countElements(head(tree)) + countElements(tail(tree));
};
console.log(countElements(tree));
console.log(countElements(tree2));*/
/** ====================================================== *
 Ниже код функции searchZeros, которая, в отличие от предыдущей реализации,
 возвращает число нулей в дереве:
 */
/*const searchZeros = (tree4) => {
	const iter = (list, acc) => {
		if (isEmpty(list)) {
			return acc;
		}
		const current = head(list);
		const rest = tail(list);
		if (!isList(current)) {
			const newAcc = current === 0 ? acc + 1 : acc;
			return iter(rest, newAcc);
		}
		return iter(rest, iter(current, acc));
	};

	return iter(tree4, 0);
};

console.log(searchZeros(l(1, 3, l(5, l(9), 3), 10)));
console.log(searchZeros(l(0, l(l(0, 100), 0), 10)));
 */

/*
Работа с древовидными структурами в промышленном программировании достаточно частая ситуация. Например, вывод файловой структуры в нашем редакторе — типичный пример работы с деревьями.

select.js
Реализуйте и экспортируйте по умолчанию функцию select, которая принимает на вход имя тега и html список, а возвращает список всех нод, соответствующих имени. Ноды возвращаются в том виде, в котором они представлены в дереве. Порядок, в котором ноды возвращаются — не важен.

Предположим, что у нас есть такой html:

<h1>scheme</h1>
<p>is a lisp</p>
<ul>
    <li>item 1</li>
    <li>item 2</li>
</ul>
<ol>
    <li>item 1</li>
    <li>item 2</li>
</ol>
<p>
    is a functional lang
</p>
<ul>
    <li>item</li>
</ul>
<div>
    <p>text</p>
</div>
<div>
    <div>
        <p>text</p>
    </div>
</div>
<h1>prolog</h1>
<p>is about logic</p>
Тогда:

const dom1 = make(); // Список нод, то есть это лес, а не дерево
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const children1 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom4 = append(dom3, node('ul', children1));
const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom5 = append(dom4, node('ol', children2));
const dom6 = append(dom5, node('p', 'is a functional language'));
const children3 = l(node('li', 'item'));
const dom7 = append(dom6, node('ul', children3));
const dom8 = append(dom7, node('div', l(node('p', 'text'))));
const dom9 = append(dom8, node('div', l(node('div', l(node('p', 'text'))))));

const dom10 = append(dom9, node('h1', 'prolog'));
const dom = append(dom10, node('p', 'is about logic'));

select('li', dom);
// [('li', 'item 1'), ('li', 'item 2'), ('li', 'item 1'), ('li', 'item 2'), ('li', 'item')]

select('p', dom);
// [('p', 'is a lisp'), ('p', 'text'), ('p', 'text'), ('p', 'is about logic'), ('p', 'is a functional language')]
Подсказки
Посмотрите в документации примеры использования функций описанных ниже.

hasChildren — функция, которая проверяет, есть ли потомки у элемента
children — функция, которая возвращает список потомков
is - функция, которая проверяет соответствие ноды переданному имени

Проанализируйте тесты

Эту задачу можно решить разными способами, алгоритм самого простого выглядит так:

Проходимся по списку нод редьюсом, который собирает результирующий список.
Если текущая нода содержит детей, то запускаем select рекурсивно для детей, а результат вызова добавляем в аккумулятор.
Если текущая нода соответствует тому, что мы ищем, добавляем её в аккумулятор.
 */