import { createElement } from "react";
import { StrongText } from "~/components/Text";

/**
 * Spreadable props which add an absolutely positioned label
 * to an input element.
 * 
 * @param text The text to display in the label.
 * @returns The props to spread.
 */
export function createLabel(text: string): any {
	return {
		label: createElement(StrongText, null, text),
		style: {
			position: 'relative'
		},
		labelProps: {
			style: {
				position: 'absolute',
				top: -23
			}
		}
	};
}