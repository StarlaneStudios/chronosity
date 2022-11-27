import { resetNavigationProgress, setNavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { Outlet, useNavigation } from "react-router-dom";
import { completeLoader } from "~/util/loader";
import { useEffect } from "react";

export const ProgressDisplay = () => {
	const navigation = useNavigation();

	// Page loading indicator
	useEffect(() => {
		if(navigation.state == 'idle') {
			completeLoader('page');

			// The timeout prevents an edge-case where a <Navigate /> on initial load
			// causes a restart of the progress bar during the same frame, which is
			// something that appears to cause Mantine to not reset the progress bar.
			setTimeout(() => resetNavigationProgress());
		} else {
			startNavigationProgress();
			setNavigationProgress(50);
		}
	}, [navigation.state]);

	return (
		<Outlet/>
	);
};