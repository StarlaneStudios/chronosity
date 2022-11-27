import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors = 'primary' | 'accent1' | 'accent2' | 'accent3' | DefaultMantineColor;

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
}