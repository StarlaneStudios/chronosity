import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ColorSchemeProvider, Loader, MantineProvider, Space } from '@mantine/core';
import { useLoadersReady } from '~/util/loader';
import { NavigationProgress } from '@mantine/nprogress';
import { CSSProperties, useEffect, useState } from 'react';
import { buildRoutes } from '~/routing';
import chronosityLogo from '~/assets/img/logo/logo-black.svg';
import classes from './style.module.scss';
import { store, useStoreValue } from '~/store';
import { NotificationsProvider } from '@mantine/notifications';
import { useChronosityTheme } from '~/util/theme';
import { useCallback } from 'react';
import { ChronosityGlobalStyle } from './global';
import { clientActions, clientReducer } from '~/store/client';

const LoadOverlay = ({ isReady }: any) => {

	const style: CSSProperties = {
		opacity: isReady ? 0 : 1,
		pointerEvents: isReady ? 'none' : 'all',
	};

	return (
		<section
			className={classes.loading}
			style={style}
		>
			<img
				src={chronosityLogo}
				alt="Chronosity"
				height={64}
			/>
			<Space h="xl" />
			<Loader
				size={34}
				variant="bars"
				color="#ff235e"
			/>
		</section>
	);
};

type Router = ReturnType<typeof createBrowserRouter>;

export const App = () => {
	const [router, setRouter] = useState<Router>();
	
	const pageReady = useLoadersReady([
		'page'
	]);
	
	const servicesReady = useLoadersReady([
		'socket',
		'extensions',
		'init'
	]);
	
	useEffect(() => {
		if (servicesReady && !router) {
			setRouter(createBrowserRouter(buildRoutes()));
		}
	}, [servicesReady, router]);
	
	// Color scheme (Light or Dark)
	const colorScheme = useStoreValue(clientReducer, (state) => state.colorScheme);
	const mantineTheme = useChronosityTheme(colorScheme);

	const toggleColorScheme = useCallback(() => {
		store.dispatch(clientActions.toggleColorScheme());
	}, []);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				withCSSVariables
				theme={mantineTheme}
			>
				<NavigationProgress />
				<ChronosityGlobalStyle />
				<LoadOverlay isReady={pageReady} />
				<NotificationsProvider>
					{router && (
						<RouterProvider
							router={router!}
						/>
					)}
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};