import { ColorScheme } from "@mantine/core";
import dayjs, { Dayjs } from "dayjs";
import { iterate } from "radash";
import { useLoaderData } from "react-router-dom";
import space from 'color-space';
import { SyntheticEvent } from "react";

/** A unique id used to identify the source of subscriptions */
export const SESSION_ID = Math.floor(Date.now() * Math.random()) % 2_147_483_647;

/** File extensions which can be previewed */
export const IMAGE_FILES = [
	'png',
	'gif',
	'jpg',
	'jpeg',
	'svg'
];

/**
 * A simple wrapper around useLoaderData providing enhanced
 * type detection by providing a loader function type.
 * 
 * Example: `useLoaderResult<typeof onPageLoad>();`
 * 
 * @returns The loader data
 */
export const useLoaderResult = <T extends () => unknown>() => useLoaderData() as Exclude<Awaited<ReturnType<T>>, Response>;

/**
 * Create a logger instance that prepends all messages
 * with the specified label.
 * 
 * @param label The label
 * @param debug Whether the logger is debug
 * @returns Logging function
 */
export function logger(label: string, debug = false): (...args: any[]) => void {
	return (...args: any) => {
		(debug ? console.debug : console.log)(`[%c${label}%c]`, 'color: #14a7f4;', '', ...args);
	};
}

/**
 * Parse the given string to a number, and simply
 * return any number passed in.
 * 
 * @param value The input
 * @returns The number
 */
export function cleanInt(value: string|number): number {
	return typeof value == 'number' ? value : Number.parseInt(value);
}

/**
 * Parse the given slug string into a numeric id.
 * 
 * Slugs follow the format of a hyphen separated string of
 * words, with the first segment being a number.
 * 
 * @param slug The slug string
 * @returns decoded id
 */
export function parseSlug(slug: string|undefined): number|undefined {
	if (!slug) {
		throw new Error('Invalid slug provided');
	}

	return Number.parseInt(slug.split('-')[0]) || undefined;
}

/**
 * Create a sorting function which adopts the order of
 * the given mirror array
 * 
 * @param proxy The proxy array
 * @param key An optional key extractor
 * @returns 
 */
export function mirrorComparator(proxy: any[], key?: string): (left: any, right: any) => number {
	return (left, right) => {
		const lk = key ? (left as any)[key] : left;
		const rk = key ? (right as any)[key] : right;

		return proxy.indexOf(lk) - proxy.indexOf(rk);
	};
}

/**
 * Build a path from the given parts
 * 
 * @param parts The parts
 * @returns The path
 */
export function buildPath(...parts: string[]): string {
	let builder = '';
	let i = 0;

	for(const part of parts) {
		builder += part;

		if(!builder.endsWith('/') && i < parts.length - 1) {
			builder += '/';
		}

		i++;
	}

	return builder;
}

/**
 * Convert the given RGB color to HEX
 * 
 * @param rgb The RGB color
 * @returns The HEX color
 */
export function rgbToHex(rgb: [number, number, number]): string {
	const [ r, g, b ] = rgb;

	function component(c: number) {
		const hex = Math.floor(c).toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	return "#" + component(r) + component(g) + component(b);
}

/**
 * Convert the given HEX color to RGB
 * 
 * @param hex The HEX color
 * @returns The RGB color
 */
export function hexToRgb(hex: string): [number, number, number] {
	const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);

	if (!result) {
		return [0, 0, 0];
	}

	return [
		Number.parseInt(result[1], 16),
		Number.parseInt(result[2], 16),
		Number.parseInt(result[3], 16)
	];
}

/**
 * Generate shades of the given color
 * 
 * @param color The base color
 * @param amount Shades ranging from dark to light
 * @returns The shades
 */
export function generateShades(color: string, amount = 10): string[] {
	const [ h, s ] = space.rgb.hsl(hexToRgb(color));

	const colors = iterate(amount, (acc, idx) => {
		const fraction = (idx - 0.5) / amount;
		const result = space.hsl.rgb([
			Math.floor(h),
			Math.floor(s),
			Math.floor(fraction * 100)
		]);

		return acc.concat(rgbToHex(result));
	}, [] as string[]);

	return colors;
}

/**
 * A function which returns true if the given HEX color is dark
 * 
 * @param hexColor The hex color string
 * @returns Whether the color is dark
 */
export function getColorShade(hexColor: string): ColorScheme {
	const [ r, g, b ] = hexToRgb(hexColor);
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luma < 142 ? 'dark' : 'light';
}

/**
 * Format the given bytes into a human readable format
 * 
 * @param value The amount of bytes
 * @returns The formatted string
 */
export function formatBytes(value: number): string {
	const units = [ 'bytes', 'KB', 'MB', 'GB', 'TB' ];
	let l = 0, n = value || 0;

	while(n >= 1024 && ++l){
		n = n/1024;
	}

	return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
}

/**
 * Combine the first letters of each word in the given string
 * 
 * @param text The text to abbreviate
 * @returns The abbreviation
 */
export function abbreviate(text: string): string {
	return text.split(' ').map(word => word[0]).join('');
}

/**
 * A function which downloads a file from the given path
 * 
 * @param url The path to the file
 * @param filename The filename
 */
export function downloadURL(url: string, filename: string) {
	const element = document.createElement('a');

	element.href = url;
	element.target = '_blank';
	element.download = filename;
				
	element.click();
}

/**
 * A function which downloads a textfile from an unparsed / text source
 * 
 * @param data The text data to download
 * @param filename The filename
 */
export function downloadText(data: string, filename: string) {
	return downloadURL('data:text/json;charset=utf-8,' + encodeURIComponent(data), filename);
}

/**
 * Insert the given insert value between each element of the given array.
 * 
 * @param items The array to insert into.
 * @param insert The value to insert.
 * @returns The new array.
 */
export function weave<T>(items: T[], insert: T) {
	return items.flatMap((item, index) => index < items.length - 1 ? [item, insert] : [item]);
}

export interface FilePickerOptions {
	filter?: string;
	multiple?: boolean;
}

/**
 * Open a file picker dialog and execute the callback
 * with the selected file(s).
 * 
 * @param options The picker options
 * @param callback Callback to execute
 */
export function openFilePicker(options: FilePickerOptions, callback: (...files: File[]) => void) {
	const input = document.createElement('input');

	input.type = 'file';
	input.accept = options.filter || '';
	input.multiple = options.multiple || false;
	input.style.display = 'none';

	input.addEventListener('change', () => {
		const files = input.files ? [...input.files] : [];

		callback(...files);
	});

	input.click();
}

/**
 * Build a URL that renders out the given icon
 * 
 * @param icon The icon to render
 * @param color The optional color
 * @returns The icon URL
 */
export function getIconUrl(icon: string, color?: string): string {
	return `/icon/${icon}${color ? `?color=${encodeURIComponent(color)}` : ''}`;
}

/**
 * Convinience method for parsing string encoded timestamps
 * 
 * @param time The unix timestamp string
 * @returns Dayjs instance
 */
export function parseTime(time: string): Dayjs {
	return dayjs(Number.parseInt(time));
}

/**
 * Extract a data key from the given event
 * 
 * @param e The triggering event
 * @param key The data key
 * @returns The value
 */
export function getData(e: SyntheticEvent, key: string): string {
	const result = (e.currentTarget as HTMLElement).dataset[key];

	if (result === undefined) {
		throw new Error(`Data key '${key}' not found`);
	}

	return result;
}