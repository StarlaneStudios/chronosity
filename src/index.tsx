import { createRoot } from 'react-dom/client';
import { App } from "./components/App";
import { layouts, routes } from "./routing";
import { buildRouteObjects } from "react-router-tree";
import { registerDefaults } from './defaults';
import { initializeClient } from './initialize';
import { Provider } from 'react-redux';
import { store } from './store';
import DefaultLayout from "./layouts/Default";
import PlainLayout from "./layouts/Plain";

registerDefaults();
initializeClient();

// Import all pages
routes.push(...buildRouteObjects({
	prefix: './pages',
	routes: import.meta.glob('./pages/**/index.tsx', { eager: true })
}));

// Import the layouts
Object.assign(layouts, {
	default: DefaultLayout,
	plain: PlainLayout
});


const root = document.querySelector('#root')!;

createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>
)