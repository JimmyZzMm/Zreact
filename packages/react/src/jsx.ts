/* eslint-disable @typescript-eslint/no-explicit-any */
// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ElementType,
	ReactElementType
} from 'shared/ReactTypes';
/**
 * 创建 React 元素
 *
 * @param type React 元素类型
 * @param key 元素的 key
 * @param ref 元素的 ref
 * @param props 元素的 props
 * @returns 返回一个 React 元素对象
 */
function ReactElement(
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		// 特殊symbol符号
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		// 自定义属性
		__mark: 'jimmy'
	};
	return element;
}

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};
	for (const prop in config) {
		const val = config[prop];
		if (key === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (key === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 判断是否是自身属性
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildren.length === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};
export const jsxDEV = jsx;
