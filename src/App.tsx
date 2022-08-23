import { List, ListSubheader, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";

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
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">Lista de Usuários</ListSubheader>
      }
      >
      {
        users.map((user) => (
          <ListItemText key={user.id} primary={user.name}></ListItemText>
        ))
      }

    </List>
	);
};

export default App;
