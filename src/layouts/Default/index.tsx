import { Outlet } from "react-router-dom";
import { Grow } from "~/components/Grow";
import { definePage } from "~/util/meta";
import { Sidebar } from "./sidebar";
import classes from './style.module.scss';

const DefaultLayout = () => {
	return (
		<div className={classes.root}>
			<Sidebar />
			<Grow className={classes.content}>
				<Outlet />
			</Grow>
		</div>
	);
};

export default definePage({
	element: <DefaultLayout />
});