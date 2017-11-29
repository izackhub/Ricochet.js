// this library will harbor any type checking needed
// this is because I haven't found a way around webpack pulling in all the library methods of is_js for type checking
// prefare a cheaper simpler more modular libraray

import { pullAt } from 'lodash';

// declare const HTMLElement: {
//     [key: string]: any;
//     new(): HTMLElement;
//     prototype: HTMLElement;
// }

export interface HTMLElement {
    [property: string]: any;
}

export const isAllDomNodes = (domList: HTMLElement[], initialIndex: number = 0): boolean => {
    /*
    const wrongTypes = dropWhile(domList, (dom: Element) => {
        return dom instanceof HTMLElement;
    })
    return wrongTypes.length == 0;
    */
    if (initialIndex < domList.length && domList[initialIndex] instanceof HTMLElement) {
        return isAllDomNodes(domList, ++initialIndex);
    }
    if (initialIndex === domList.length) {
        return true;
    }
    return false;
}