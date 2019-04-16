import { isEmpty, head, tail } from 'hexlet-pairs-data';
import { getValue, is } from 'hexlet-html-tags';

// BEGIN (write your solution here)
export const reduce = (func, counter, elements) => {
	const iter = (items, acc) => {
		if(isEmpty(items)) {
			return acc;
		}
		return iter(tail(items), func(head(items), acc));
	};
	return iter(elements, counter)
};

export const emptyTagsCount = (tagName, elements) => reduce((element, acc) => {
	if (is(tagName, element)) {
		return getValue(element) === '' ? acc + 1 : acc;
	}
	return acc;
}, 0, elements);

// END

export const headersCount = (tagName, elements) => {
	const iter = (items, acc) => {
		if (isEmpty(items)) {
			return acc;
		}

		const item = head(items);
		const newAcc = is(tagName, item) ? acc + 1 : acc;
		return iter(tail(items), newAcc);
	};
	return iter(elements, 0);
};

/*
html-tags.js
Реализуйте и экспортируйте функцию reduce для библиотеки html-tags:

import { node, append, make, reduce } from 'hexlet-html-tags';

const html1 = append(make(), node('h1', 'header1'));
const html2 = append(html1, node('h1', 'header2'));
const html3 = append(html2, node('p', 'content'));

reduce((element, acc) => {
  return is('h1', element) ? acc + 1 : acc;
}, 0, html3); // 2
Реализуйте и экспортируйте функцию emptyTagsCount, которая считает количество пустых тегов. Тип тега задается первым параметром функции.

import { make, append, node } from 'hexlet-html-tags';

const html1 = make();
const html2 = append(html1, node('h1', 'scheme'));
const html3 = append(html2, node('p', 'is a lisp'));
const html4 = append(html3, node('blockquote', ''));
const html5 = append(html4, node('blockquote', ''));
const html6 = append(html5, node('blockquote', 'quote'));

emptyTagsCount('blockquote', html6); // 2
Примечания
Функцию headersCount можно использовать для наглядного сопоставления частного варианта свёртки с обобщённой реализацией операции отображения (собственно, reduce).

Подсказки
При необходимости вы можете самостоятельно импортировать функцию toString из библиотеки hexlet-pairs-data и использовать её для отладки решений. Эта функция возвращает строковое представление списка
При необходимости вы можете самостоятельно импортировать функцию toString из библиотеки hexlet-html-tags и использовать её для отладки решений. Эта функция возвращает строковое представление html-списка
Для разрешения противоречий в случае импорта нескольких функций с одинаковыми именами используйте псевдонимы (aliases)

 */

/*
import {
  make, append, node, getValue, is,
} from 'hexlet-html-tags';

import { reduce, emptyTagsCount, headersCount } from '../html-tags';

describe('dom', () => {
  let dom;

  beforeAll(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));

    const dom7 = append(dom6, node('h2', ''));
    const dom8 = append(dom7, node('span', ''));
    dom = append(dom8, node('p', 'is about logic'));
  });

  it('#headersCount', () => {
    const count = headersCount('h1', dom);
    expect(count).toBe(3);
  });

  describe('#reduce', () => {
    it('should count h1 tags', () => {
      const count = reduce((element, acc) => (is('h1', element) ? acc + 1 : acc), 0, dom);
      expect(count).toBe(3);
    });

    it('should count span tags', () => {
      const count2 = reduce((element, acc) => (is('span', element) ? acc + 1 : acc), 0, dom);
      expect(count2).toBe(1);
    });

    it('should reduce to string', () => {
      const count3 = reduce((element, acc) => {
        const content = getValue(element);
        return is('h1', element) ? `${acc} ${content}` : acc;
      }, 'Languages:', dom);

      const expected3 = 'Languages: prolog haskell scheme';
      expect(count3).toBe(expected3);
    });
  });


  it('#emptyTagsCount', () => {
    const dom1 = append(dom, node('blockquote', ''));
    const dom2 = append(dom1, node('blockquote', ''));
    const dom3 = append(dom2, node('blockquote', 'quote'));
    const dom4 = append(dom3, node('blockquote', ''));
    const dom5 = append(make(), node('blockquote', 'smth'));
    expect(emptyTagsCount('blockquote', dom3)).toBe(2);
    expect(emptyTagsCount('blockquote', dom4)).toBe(3);
    expect(emptyTagsCount('blockquote', dom5)).toBe(0);
    expect(emptyTagsCount('p', dom4)).toBe(0);
  });
});


 */