import { TextProps } from "@mantine/core";
import { Text, Title, TitleProps } from "@mantine/core";
import { LIGHT_TEXT_1, LIGHT_TEXT_2, LIGHT_TEXT_3 } from "~/util/theme";

/**
 * A text component used to represent a major title on a page.
 */
export const MajorTitle = (props: TitleProps) => {
	const { children, ...rest } = props;

	return (
		<Title
			weight={700}
			color={LIGHT_TEXT_3}
			style={{ textTransform: 'capitalize' }}
			size={24}
			order={1}
			{...rest}
		>
			{children}
		</Title>
	);
};

/**
 * A text component used to represent a minor title on a page.
 */
export const MinorTitle = (props: TitleProps) => {
	const { children, ...rest } = props;

	return (
		<Title
			weight={600}
			color={LIGHT_TEXT_3}
			style={{ textTransform: 'capitalize' }}
			size={18}
			order={2}
			{...rest}
		>
			{children}
		</Title>
	);
};

/**
 * A text component used to represent subtle text on a page.
 */
export const SubtleText = (props: TextProps) => {
	const { children, ...rest } = props;

	return (
		<Text
			weight={700}
			color={LIGHT_TEXT_1}
			style={{ fontSize: 15 }}
			{...rest}
		>
			{children}
		</Text>
	);
};

/**
 * A text component used to represent a strong piece of text on a page.
 */
export const StrongText = (props: TextProps) => {
	const { children, ...rest } = props;

	return (
		<Text
			weight={600}
			color={LIGHT_TEXT_2}
			style={{ fontSize: 14 }}
			{...rest}
		>
			{children}
		</Text>
	);
};