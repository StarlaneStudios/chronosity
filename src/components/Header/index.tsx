import { mdiBell, mdiChevronDown, mdiInformation, mdiLock, mdiOpenInNew } from "@mdi/js";
import { Avatar, Button, Container, Divider, Group, Menu, Paper, Stack, Text, TitleProps } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";
import { abbreviate } from "~/util/helpers";
import { MajorTitle, StrongText } from "../Text";
import { Icon } from "../Icon";
import { LIGHT_TEXT_3 } from "~/util/theme";
import { Spacer } from "../Spacer";
import classes from './style.module.scss';
import { usePageHandles } from "~/hooks/pages";

export interface HeaderProps extends PropsWithChildren {
	title?: ReactNode;
}

/**
 * Customized version of MajorTitle that is used in the header.
 */
export const HeaderTitle = (props: PropsWithChildren<TitleProps>) => {
	const { children, ...rest } = props;

	return (
		<MajorTitle className={classes.title} {...rest}>
			{children}
		</MajorTitle>
	);
};

export const Header = (props: HeaderProps) => {
	const handle = usePageHandles();

	return (
		<>
			<Paper component="header" className={classes.root}>
				<Container>
					<Group py="sm" spacing="sm">

						{props.title || (
							<Header.Title>
								{handle.title}
							</Header.Title>
						)}

						<Spacer />
						
						<Button
							variant="subtle"
							color={LIGHT_TEXT_3}
							px={7}
						>
							<Icon
								path={mdiBell}
								size={1.3}
							/>
						</Button>

						<Menu
							trigger="hover"
							shadow="sm"
						>
							<Menu.Target>
								<Group spacing="xs" style={{ cursor: 'pointer' }}>
									<Avatar
										color="primary"
										src=""
									>
										{abbreviate("Test User")}
									</Avatar>
									<Icon
										path={mdiChevronDown}
									/>
								</Group>
							</Menu.Target>
							<Menu.Dropdown>
								<Stack
									spacing={0}
									px={13}
									py={10}
								>
									<StrongText>
										Test User
									</StrongText>
									<Text size="sm">
										@test
									</Text>
								</Stack>
								<Divider />
								<Menu.Item
									icon={<Icon path={mdiInformation} />}
									component="a"
									href="https://chronosity.net/docs"
								>
									<Group spacing={6}>
										Help
										<Icon
											path={mdiOpenInNew}
											size="sm"
										/>
									</Group>
								</Menu.Item>
								<Divider />
								<Menu.Item
									color="red"
									icon={<Icon path={mdiLock} />}
								>
									Sign out
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
					{props.children}
				</Container>
				
				<Divider />
			</Paper>

			{/* <Container mb="xl">
				<Group>
					<SubtleText className={classes.breadcrumb}>
						{breadcrumb}
					</SubtleText>
					<Spacer />
					<Button
						variant="light"
						onClick={openCreatorPanel}
						rightIcon={
							<Icon path={mdiPlus} />
						}
					>
						Create new
					</Button>
				</Group>
			</Container> */}
		</>
	);
};

Header.Title = HeaderTitle;