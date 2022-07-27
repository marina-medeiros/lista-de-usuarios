import { useState, useEffect } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const App = (props: any) => {
	const [users, setUsers] = useState([
		{ id: 1, name: "Minora" },
		{ id: 2, name: "Ataide" },
	]);
  const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users/")
			.then((response) => response.json())
			.then((json) => {setUsers(json); setLoading(false)});
	});
	return (
		<div className="App">
			<h1>Lista de usuários</h1>
			<div className="card">
        {loading ? <h2>Carregando...</h2> : null}
				<ul>
					{users.map((user) => (
						<li key={user.id}>{user.name}<Avatar src="/static/images/avatar/3.jpg" /></li>
					))}
				</ul>
			</div>
      <Button variant="contained">Curtir</Button>
		</div>
	);
};

export default App;