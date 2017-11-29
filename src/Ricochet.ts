import { map, filter, ObjectIteratorTypeGuard } from 'lodash';
import { domNode as isDomNode, number as isNumber, function as isFunction } from 'is_js';
import { isAllDomNodes, HTMLElement } from './Tetective';

export class Ricochet {
    [method: string]: any | Function;
    [element: number]: HTMLElement;
    private readonly domList: NodeListOf<Element> | HTMLElement[];

	constructor(selectedNodes?: NodeListOf<Element> | HTMLElement[]) {

		if (selectedNodes instanceof NodeList || selectedNodes instanceof Array) {

			this.domList = selectedNodes;
		}
	}
    private ricochet (selectedNodes: NodeListOf<Element> | HTMLElement[]): Ricochet {
        return new Proxy(new Ricochet(selectedNodes), {
            get: (target: any, fieldName: string) => {
                if(fieldName in target) {
                    // caveat work around
                    // for some reason, .item causes TypeError
                    if (fieldName === 'item') {
                        return (index: string) => {
                            return target[index];
                        }
                    }
                    return target[fieldName];
                } else {
					alert(fieldName)
                    // checking is property is a function
                    const headDom = selectedNodes[0];
                    
                    const targetMember = (<HTMLElement>headDom)[fieldName];

                    if (isFunction(targetMember)) {
                        // using classic function, because arrow function inherits scopes/context
                        // classic function creates new scope
                        return function() {
                            return map<HTMLElement, any[]>(selectedNodes, (element: HTMLElement) => {
                                return element[fieldName](...arguments);
                            })
                        }
                    } else {
                        return map<HTMLElement, any[]>(selectedNodes, (element: HTMLElement) => {
                            return element[fieldName];
                        })
                    }
                }
            }
        });
    }
    query (query: string, rootDom?: HTMLElement): Ricochet {
        let list;
        if (isDomNode(rootDom)) {
            list = (<HTMLElement>rootDom).querySelectorAll(query);
        }
        else if (rootDom === undefined) {
            list = document.querySelectorAll(query);
        }
        else {
            throw new Error('[type error]: the second argument must be of type node, othewise undefined');
        }
        return this.ricochet(list);
    }
    get selection (): HTMLElement[] {
        return map<HTMLElement, HTMLElement>(this.domList, (element: HTMLElement) => {
            return element;
		})
    }
    range (start:  number, end: number = this.domList.length, skips: number = 0): Ricochet {
        let skipper: number = 0;

        const list = filter<HTMLElement>(this.domList, (value: HTMLElement, index: number) => {
            const i: boolean = index >= start && index <= end;

            if (i !== true) {
                return false;
            }
            ++skipper;

            if (skipper % skips === 0) {
                skipper = 0;
                return false;
            }
            return true;
		})
		return this.ricochet(list);
	}
	filter (predicate: ObjectIteratorTypeGuard<HTMLElement, HTMLElement[]>): Ricochet {
		const list = filter<HTMLElement, HTMLElement[]> (this.domList, predicate);

		return this.ricochet(list);
	}
}

declare global {
    interface Window { Ricochet: typeof Ricochet; }
}

window.Ricochet = Ricochet;
