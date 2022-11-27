import { useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import logoWhite from '~/assets/img/logo/logo.svg';
import logoBlack from '~/assets/img/logo/logo-black.svg';
import useStyles from './styles';

export interface LogoProps {
	height?: string;
	imgClass?: string;
}

export const Logo = (props: LogoProps) => {
	const { classes, cx } = useStyles();
	const theme = useMantineTheme();

	const logoUrl = theme.colorScheme == 'dark' ? logoWhite : logoBlack;
	const height = props.height || '2.75rem';

	return (
		<Link
			className={classes.root}
			to='/'
		>
			<img
				src={logoUrl}
				className={cx(classes.image, props.imgClass)}
				onDragStart={e => e.preventDefault()}
				style={{ height }}
			/>
		</Link>
	);
};