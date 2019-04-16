import {
	node, getValue, is, map, filter, reduce,
} from 'hexlet-html-tags';

import { wc } from './utils';

// BEGIN (write your solution here)
export const extractHeaders = (html) => {
	const filterHeaders = filter(item =>
			is('h2', item), html);
	return map(element =>
			node('p', getValue(element)), filterHeaders);
};

export const wordsCount = (tagName, word, html) => {
	const filterTagName = filter(item =>
			is(tagName, item), html);
	const values = map(element =>
			getValue(element), filterTagName);
	return reduce((text, acc) => wc(word, text) + acc, 0, values);
};
// END

/*
import { make, append, node, toString as htmlToString } from 'hexlet-html-tags'; // eslint-disable-line
import { extractHeaders, wordsCount } from '../html-tags';

const dom1 = make();
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const dom4 = append(dom3, node('h2', 'haskell'));
const dom5 = append(dom4, node('p', 'is a functional language'));

const dom6 = append(dom5, node('h2', 'prolog'));
const dom7 = append(dom6, node('p', 'sicp'));
const dom8 = append(dom7, node('blockquote', 'haskell haskell'));
const dom9 = append(dom8, node('blockquote', 'quote'));
const dom10 = append(dom9, node('h2', 'haskell'));
const dom = append(dom10, node('p', 'is about logic haskell'));

describe('dom', () => {
  it('#extractHeaders', () => {
    const headersAsP = extractHeaders(dom);
    const result = '<p>haskell</p><p>prolog</p><p>haskell</p>';
    expect(htmlToString(headersAsP)).toBe(result);
  });

  it('#wordsCount', () => {
    expect(wordsCount('i', 'scheme', dom)).toBe(0);
    expect(wordsCount('h1', 'undefined', dom)).toBe(0);
    expect(wordsCount('h1', 'scheme', dom)).toBe(1);
    expect(wordsCount('blockquote', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'h2', dom)).toBe(0);
  });
});

 */


/*
html-tags.js
Реализуйте и экспортируйте функцию extractHeaders, которая извлекает тексты всех заголовков h2 из переданного html и возвращает html в котором каждый из этих текстов обернут в p.

Например такой html в строковом представлении <h2>header1</h2><h2>header2</h2><p>content</p> превратится в такой <p>header1</p><p>header2</p>. Ниже развернутый пример.

import { node, append, make, reduce, toString as htmlToString } from 'hexlet-html-tags';

const html1 = append(make(), node('h2', 'header1'));
const html2 = append(html1, node('h2', 'header2'));
const html3 = append(html2, node('p', 'content'));
// => <h2>header1</h2><h2>header2</h2><p>content</p>

htmlToString(extractHeaders(html3));
// => <p>header1</p><p>header2</p>
Реализуйте и экспортируйте функцию wordsCount, которая считает вхождения слова в определенный тег. Для подсчета слов в тексте одного тега воспользуйтесь вспомогательной функцией wc, которая уже импортирована в модуль html-tags.

import { make, append, node } from 'hexlet-html-tags';

const html1 = append(make(), node('h2', 'header1 lisp'));
const html2 = append(html1, node('p', 'content'));
const html3 = append(html2, node('h2', 'lisp header2 lisp'));
const html4 = append(html3, node('p', 'content lisp'));

wordsCount('h2', 'lisp', html4); // 3
Подсказки
Подсчет слов в тексте: wc(word, text), где word искомое слово, а text это текст, в котором ведется поиск.
  wc('what', 'what, what, who, what'); // 3
  wc('la', 'loli'); // 0
При необходимости вы можете самостоятельно импортировать функцию toString из библиотеки hexlet-pairs-data и использовать её для отладки решений. Эта функция возвращает строковое представление списка
При необходимости вы можете самостоятельно импортировать функцию toString из библиотеки hexlet-html-tags и использовать её для отладки решений. Эта функция возвращает строковое представление html-списка
Для разрешения противоречий в случае импорта нескольких функций с одинаковыми именами используйте псевдонимы (aliases)

 */