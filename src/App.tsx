import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import { Box, CircularProgress, Container, getImageListItemBarUtilityClass, Typography } from "@mui/material";

const App = (props: any) => {
  const [page,setPage] = useState(0);
  const [userMain,setUserMain] = useState(
    { id: 0, name: "i" }
  );
  const [postMain,setPostMain] = useState(
    { id: 1, title: "post", body: "oii" },
  );

  const PageComentarios = (pros: any) => {
    const [comentario, setComentario] = useState([
      { postId: 1, id: 1, name: "comentario1", email: "joao@email.com", body: "oii" },
      { postId: 2, id: 2, name: "comentario2", email: "jose@email.com", body: "gostei" },
    ]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postMain.id}`)
        .then((response) => response.json())
        .then((json) => {setComentario(json); setLoading(false)});
    });

    return (
      <div className="App">
        <h2>Comentarios do Post de {userMain.name}</h2>
        <Button onClick={() => {setPage(2)}} variant="text">Voltar para o Post de {userMain.name}</Button>
        <div className="card">
          {loading ? <h2>Carregando...</h2> : null}
          <ul>
            {comentario.map((comentario) => (
              <li key={comentario.id}><h3>{comentario.name}</h3><p>{comentario.body}</p> </li>
              
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const PagePosts = (pros: any) => {
    const [posts, setPosts] = useState([
      { id: 1, title: "post", body: "oii" },
      { id: 2, title: "post2", body: "abc" },
    ]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users/" + userMain.id + "/posts")
        .then((response) => response.json())
        .then((json) => {setPosts(json); setLoading(false)});
    });

    return (
      <div className="App">
        <h2>Posts de {userMain.name}</h2>
        <Button onClick={() => {setPage(1)}} variant="text">Tarefas de {userMain.name}</Button>
        <div className="card">
          {loading ? <h2>Carregando...</h2> : null}
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <Button onClick={() => {setPage(3); setPostMain(post)}} variant="text">Comentários do Post {post.id} de {userMain.name}</Button>
              </li>
              
              
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const PageTarefas = (props: any) =>{
    const [todos, setTodos] = useState([
      { id: 1, title: "tarefa", completed: true },
      { id: 2, title: "tarefa2", completed: true },
    ]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users/" + userMain.id + "/todos")
        .then((response) => response.json())
        .then((json) => {setTodos(json); setLoading(false)});
    });
    return (
      <div className="App">
        <h2>Tarefas de {userMain.name}</h2>
        <Button onClick={() => {setPage(2)}} variant="text">Posts de {userMain.name}</Button>
        <div className="card">
          {loading ? <h2>Carregando...</h2> : null}
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title} -- {todo.completed ? <span>Feito</span> : <span>Incompleto</span>}</li>
              
            ))}
          </ul>
        </div>
      </div>
    );

  }

  const PageUsuarios = (props: any) => {
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
        <h2>Lista de usuários</h2>
        <div className="card">
          {loading ? <h2>Carregando...</h2> : null}
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name}
                <Button onClick={() => {setPage(2); setUserMain(user)}} variant="text">Posts</Button>
                <Button onClick={() => {setPage(1); setUserMain(user)}} variant="text">Tarefas</Button>
              </li>
              
            ))}
          </ul>
        </div>
      </div>
    );
  }
  const PageDisplay = (props: any) => {
    if(page == 0){
      return <PageUsuarios/>
    }
    if(page == 1){
      return <PageTarefas/>
    }
    if(page == 2){
      return <PagePosts/>
    }
    if(page == 3){
      return <PageComentarios/>
    }
    else {
      return null;
    } 
  }

	return (
    <Container>
      <h1>Rede social</h1>
      <Button onClick={() => {setPage(0)}} variant="text">Pagina inicial</Button>
      
      <PageDisplay/>
    </Container>
  )
};

export default App;