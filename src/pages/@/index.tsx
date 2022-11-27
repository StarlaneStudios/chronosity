import { definePage } from '../../util/meta';
import { Container, Text } from '@mantine/core';
import { Header } from '~/components/Header';

function HomePage() {
	return (
		<>
			<Header />
			<Container>
				<Text>This is the 10/10 homepage!</Text>
			</Container>
		</>
	)
}

export default definePage({
	element: <HomePage />,
	handle: {
		title: 'Home'
	}
});