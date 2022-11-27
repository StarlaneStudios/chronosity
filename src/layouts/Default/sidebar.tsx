import { Box, Button, Divider } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { Icon } from '~/components/Icon';
import { Logo } from '~/components/Logo';
import { useRegistry } from '~/hooks/registry';
import { NavigationItem, navigationItems } from '~/registry';
import { LIGHT_TEXT_2 } from '~/util/theme';
import classes from './style.module.scss';

interface SidebarNavLinkProps {
	item: NavigationItem;
	color?: string;
}

const SidebarNavLink = ({ item, color }: SidebarNavLinkProps) => (
	<NavLink
		to={item.path}
		end
		style={{
			textDecoration: 'none'
		}}
	>
		{({ isActive }) => (
			<Button
				mb={10}
				fullWidth
				leftIcon={<Icon path={item.icon} />}
				variant={isActive ? 'light' : 'subtle'}
				color={color || (isActive ? 'primary' : LIGHT_TEXT_2)}
				styles={{
					inner: {
						justifyContent: 'flex-start',
						textTransform: 'capitalize',
						letterSpacing: 0,
						fontWeight: 500,
						fontSize: 14
					}
				}}
			>
				{item.title}
			</Button>
		)}
	</NavLink>
);

export const Sidebar = () => {
	const navigation = useRegistry(navigationItems);

	return (
		<>
			<aside className={classes.sidebar}>
				<Box my={36} className={classes.sidebarLogo}>
					<Logo />
				</Box>

				{navigation.map((item, i) => (
					<SidebarNavLink
						key={i}
						item={item}
					/>
				))}
			</aside>
			<Divider
				orientation="vertical"
			/>
		</>
	);
};