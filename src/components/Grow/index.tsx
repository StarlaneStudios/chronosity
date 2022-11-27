import { Box, BoxProps } from "@mantine/core";

export const Grow = (props: BoxProps) => {
	const { style, ...rest } = props;

	return (
		<Box
			style={{
				flexGrow: 1,
				...style,
			}}
			{...rest}
		/>
	);
};