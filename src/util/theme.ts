import { ColorScheme, MantineThemeOverride } from "@mantine/core";
import { useMemo } from "react";

export const LIGHT_BORDER = 'light.0';
export const LIGHT_TEXT_1 = 'light.3';
export const LIGHT_TEXT_2 = 'light.6';
export const LIGHT_TEXT_3 = 'light.9';

export const PROJECT_COLOR = 'project.3';

const BREAKPOINTS = {
	xs: 600,
	sm: 940,
	md: 1200,
	lg: 1340,
	xl: 1620,
};

// NOTE - Temporary workaround, waiting for #
const carouselSpeed = Number.parseInt(import.meta.env.VITE_CHRONOSITY_CAROUSEL_SPEED || 10);

export function useChronosityTheme(colorScheme: ColorScheme): MantineThemeOverride {
	return useMemo(() => ({
		colorScheme: colorScheme,
		fontFamily: 'Montserrat',
		defaultRadius: 'md',
		primaryColor: 'primary',
		breakpoints: BREAKPOINTS,
		fontSizes: {
			xs: 12,
			sm: 13,
			md: 14,
			lg: 16,
			xl: 18
		},
		headings: {
			fontFamily: 'Montserrat',
			sizes: {
				h1: { fontSize: 28, fontWeight: 700 },
				h2: { fontSize: 20, fontWeight: 600 },
				h3: { fontSize: 16, fontWeight: 500 },
			}
		},
		colors: {
			primary: [ '#FEE3F2', '#FDBFD7', '#FC9AC1', '#FA81A5', '#FA6899', '#FC4E88', '#F5227A', '#E11E79', '#A11F51', '#561D30' ],
			accent1: [ '#FEEDE5', '#FEDCCD', '#FDCDB7', '#FDB390', '#FE9777', '#FE8060', '#FF714D', '#D1513D', '#983933', '#552222' ],
			accent2: [ '#FDEFF2', '#FDD8E1', '#FEC1CF', '#FEA3B8', '#FF8EA8', '#FF7595', '#FF587F', '#D33E5A', '#96273C', '#5A1E2A' ],
			accent3: [ '#ECEEFE', '#D4D9FD', '#B9C1FD', '#A1ADFE', '#9695FF', '#7A7CFF', '#6164FF', '#4E51C5', '#373996', '#202255' ],
			light: [ '#E8EDF2', '#C9D4DE', '#ADBACA', '#9BA9C6', '#8391AE', '#67748F', '#465671', '#384768', '#2D3A5D', '#212E59' ]
		},
		components: {
			Modal: {
				defaultProps: {
					centered: true
				}
			},
			Menu: {
				defaultProps: {
					withinPortal: true
				}
			},
			Select: {
				defaultProps: {
					withinPortal: true
				}
			},
			Button: {
				styles: {
					root: {
						textTransform: 'uppercase',
						letterSpacing: 1
					}
				}
			},
			Divider: {
				defaultProps: {
					color: LIGHT_BORDER,
					size: 2
				}
			},
			Container: {
				defaultProps: {
					sizes: BREAKPOINTS
				}
			},
			Paper: {
				styles: (theme) => ({
					root: {
						color: theme.fn.themeColor(LIGHT_TEXT_2),
					}
				})
			},
			Input: {
				styles: (theme) => ({
					icon: {
						color: theme.fn.themeColor('light.4')
					},
					input: {
						'&::placeholder': {
							color: theme.fn.themeColor('light.4')
						}
					}
				})
			},
			Radio: {
				styles: {
					label: {
						display: 'block'
					}
				}
			},
			Carousel: {
				defaultProps: {
					speed: carouselSpeed
				}
			},
			Tabs: {
				styles: {
					tab: {
						fontWeight: 500
					}
				}
			}
		}
	}), [colorScheme]);	
}