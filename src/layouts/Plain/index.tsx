import { Outlet } from "react-router-dom";
import { definePage } from "~/util/meta";

const PlainLayout = () => {
	return (
		<Outlet />
	);
};

export default definePage({
	element: <PlainLayout />
});