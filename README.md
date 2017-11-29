# Ricochet; All as 1 DOM selection library, powered by ES6 Proxy

## Background

Ricocht is a DOM selector utility which allows you to manipulate a collection of HTML element like a single element.
Less like jquery, more like (and inspired) by [NodeList](https://github.com/eorroe/NodeList.js), this utility tool aims to make DOM manipulation as easy and straight forward as possible.

I wrote this library because NodeList is pre `ES6` and does not offer module pattern for modern applications. With the growing support for ES6 and the new and powerful Proxy class, this library takes advantage of the new features and allows for very simple and more powerful implementation.

This utility tool is **not battle-tested yet** and can be considered in a beta phase. I use it for my little projects that do not need a lot. But great improvement is required.

I work on this in my free time, so any improvement and features are gladly welcome.

## Usage

  const ric = new Ricochet();
  ric.query('div');
  // or
  const ric = new Ricochet(Nodelist: NodeListOf<Element> | HTMLElement[]);
  // call any Element.<method or property> to receive a collection of the individual request
  ric.nodeName;
  ric.click();
  // get a selection of the selected
  ric.range(start, end, skips);
  // get the selection as array
  ric.selection;
  // iterate
  ric.filter(predicate: ObjectIteratorTypeGuard<HTMLElement, HTMLElement[]>);

## TODO

* Make fully functional
* Make intellisence available when used in TypeScript
* Simplyfy query from constructor and remove query
* Improve array member function call (functional)
* Use more modular `lodash` methods
* some other stuff I haven't thought of yet....