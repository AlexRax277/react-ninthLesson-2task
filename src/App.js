import './App.css';
import NewPost from './Components/NewPost.js';
import MainPage from './Components/MainPage.js';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Context } from "./Components/Context/Context.js";

/**
 * Компонент-приложение
 * инициализируются переменные и пробрасываются дочерним компонентам через контекст
 * есть ссылка на создание нового компонента
 * роутит между страницей создания нового компонента, списком постов (и дальнейим разветвлением) и страницей 404
 */
function App() {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  
  return <Context.Provider value={ {status, setStatus, navigate, url} }>
      <Link to='new'className='new'>Создать пост</Link>
      <Routes>
        <Route path='posts/*' element={ <MainPage /> }/>
        <Route path='new' element={ <NewPost /> } />
        <Route path='*' element={ <div>Упс...страница не найдена</div> } />
      </Routes>
      
      
    </Context.Provider>
}

export default App;
