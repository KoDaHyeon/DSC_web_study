import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { Main, CreateRoom, EnterRoom } from './components/page';
import './scss/main.scss';

function App() {
	return (
		<BrowserRouter>
			<Grid className="app">
				<Typography className="app-title">Raccoon</Typography>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/create" component={CreateRoom} />
					<Route exact path="/enter" component={EnterRoom} />
					{/* route 하는 경로에 exact를 넣어주면 해당 페이지의 경로가
				 완전히 일치할 때만 라우트 페이지를 나타내고,
				 빼주면 해당경로의 하위경로가 있을시에도 나타냅니다. */}
				</Switch>
			</Grid>
		</BrowserRouter>
	);
}

export default App;
