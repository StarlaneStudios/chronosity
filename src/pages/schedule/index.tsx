import { definePage } from '../../util/meta';
import { Button, Container, Group, Paper, Stack, Text, Select, Table, Center } from '@mantine/core';
import { useInputState } from "@mantine/hooks";
import { Header } from '~/components/Header';
import dayjs from 'dayjs';
import { mdiChevronLeft, mdiChevronRight, mdiPlus } from '@mdi/js';
import { Icon } from '~/components/Icon';
import { Spacer } from '~/components/Spacer';
import classes from './style.module.scss';
import { useState } from 'react';
import { createLabel } from '~/util/general';

function computeWeekdays(currentWeek: any): any[] {
	const days: any[] = [];
	
	for (let i = 0; i < 7; i++) {
		const dayStart = currentWeek.add(i, 'day');
		const dayEnd = currentWeek.add(i + 1, 'day');
		const isCurrent = dayjs().isBetween(dayStart, dayEnd);

		days.push({
			title: dayStart.format('dddd'),
			subtitle: dayStart.format('MMM Do'),
			current: isCurrent,
			startDate: dayStart,
			endDate: dayEnd
		});
	}

	return days;
}

function SchedulePage() {
	const eventTypes = [
		{
			text: 'Shift',
			help: 'A shift you expect to attend',
			value: 'regular',
			color: '#ff9530'
		},
		{
			text: 'Tentative Shift',
			help: 'A shift that is subject to change',
			value: 'tentative',
			color: '#9a45ff'
		},
		{
			text: 'Focus Shift',
			help: 'A shift you\'d prefer to work on undisturbed',
			value: 'focus',
			color: '#ff5353'
		},
		{
			text: 'Vacation',
			help: 'Time off / Unavailable',
			value: 'vacation',
			color: '#616e87'
		},
	];
	
	const sortingMethods = [
		{ label: 'Alphabetical', value: 'alphabetical' },
		{ label: 'Most Activity', value: 'most_active' },
		{ label: 'Least Activity', value: 'least_active' }
	];

	const copyOptions = [
		{ label: 'Yesterday', value: 'yesterday' },
		{ label: 'Tomorrow', value: 'tomorrow' },
		{ label: 'Next Week', value: 'next_week' },
		{ label: 'Next Month', value: 'next_month' }
	]

	let planType = 'regular';

	const weekFormatting = "MMM Do, YYYY";

	const [ currentWeek, setCurrentWeek ] = useState(dayjs());
	const [ weekStart, setWeekStart ] = useState(currentWeek.format(weekFormatting));
	const [ weekEnd, setWeekEnd ] = useState(currentWeek.add(6, 'days').format(weekFormatting));
	const [ sortMethod, setSortMethod ] = useInputState(sortingMethods[0]);

	const typeColor = eventTypes.find(type => type.value === planType)!.color;

	return (
		<>
			<Header />
			<Paper className={classes.contentArea}>
				<Container mt={30}>
					<Group>
						<Select
							data={sortingMethods}
							value={sortMethod.value}
							placeholder={sortMethod.label}
							onChange={setSortMethod}
							{...createLabel('')}
						/>
						<Spacer />
						<Button
							color="primary"
							rightIcon={<Icon path={mdiPlus} />}
						>
							Plan Event
						</Button>
					</Group>
				</Container>
				<Container mt={20} p={10} className={classes.scheduleHeader}>
					<Group align="center">
						<Button
							color="primary"
							onClick={() => {
								const week = currentWeek.subtract(1, 'week');

								setCurrentWeek(week);
								setWeekStart(week.format(weekFormatting));
								setWeekEnd(week.add(6, 'days').format(weekFormatting));
							}}
						>
							<Icon path={mdiChevronLeft} />
						</Button>
						<Spacer />
						<Stack spacing={0} align="center">
							<Text weight={800}>Week of</Text>
							<Group spacing={8}>
								<Text weight={500}>{weekStart}</Text>
								<Text>to</Text>
								<Text weight={500}>{weekEnd}</Text>
							</Group>
						</Stack>
						<Spacer />
						<Button
							color="primary"
							onClick={() => {
								const week = currentWeek.add(1, 'week');

								setCurrentWeek(week);
								setWeekStart(week.format(weekFormatting));
								setWeekEnd(week.add(6, 'days').format(weekFormatting));
							}}
						>
							<Icon path={mdiChevronRight} />
						</Button>
					</Group>
				</Container>
				<Container mt={15}>
					<Table
						highlightOnHover
						verticalSpacing="sm" 
						fontSize="md"
					>
						<thead>
							<tr>
								 <>
									<th />
									{computeWeekdays(currentWeek).map((weekday, i) => (
										<th key={i}>
											<Stack spacing={0} align="center">
												<div className={classes.todayHighlight} />
												<Text size={15} weight={800}>{weekday.title}</Text>
												<Text weight={500}>{weekday.subtitle}</Text>
											</Stack>
										</th>
									))}
								 </>
							</tr>
							<tr>
								<td>
									<Text align="center" weight={600}>SHIFT SCHEDULE</Text>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Test User</td>
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
							</tr>
						</tbody>
					</Table>
				</Container>
			</Paper>
		</>
	)
}

export default definePage({
	element: <SchedulePage />,
	handle: {
		title: 'Schedule'
	}
});