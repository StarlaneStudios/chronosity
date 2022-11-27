import { Global } from "@mantine/core";
import { LIGHT_TEXT_2 } from "~/util/theme";

export const ChronosityGlobalStyle = () => (
	<Global
		styles={theme => ({
			body: {
				color: theme.fn.themeColor(LIGHT_TEXT_2)
			}
		})}
	/>
);