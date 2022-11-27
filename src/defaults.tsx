import 'dayjs/locale/en-ca';

import relative from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import advancedFormat  from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import dayjs from "dayjs";

import { mdiClockOutline, mdiHome } from '@mdi/js';
import { navigationItems } from './registry';

export function registerDefaults() {

	// Dayjs configuration
	dayjs.extend(relative);
	dayjs.extend(duration);
	
	dayjs.extend(advancedFormat);
	dayjs.extend(isBetween);
	dayjs.extend(timezone);
	dayjs.extend(isoWeek);
	dayjs.extend(minMax);
	dayjs.extend(utc);

	dayjs.locale('en-ca');

	// ANCHOR Navigation items
	navigationItems.register('home', 0, {
		title: 'Home',
		icon: mdiHome,
		path: '/',
	});

	navigationItems.register('schedule', 10, {
		title: 'Schedule',
		icon: mdiClockOutline,
		path: '/schedule',
	});
}