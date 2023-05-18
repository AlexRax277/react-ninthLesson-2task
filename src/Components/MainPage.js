import { useEffect, useState, useContext } from "react";
import { Routes, Route} from 'react-router-dom';
import Post from './Post.js';
import Card from "./Card.js";
import { Context } from "./Context/Context.js";

/**
 * Компонент-главная страница (список всех постов)
 * пропсы отсутствуют, данные берутся из контекста 
 * на сервер отправляется GET-запрос на все имеющиеся данные по постам
 * роутит между общим списком и конкретным постом
 */
const MainPage = () => {
    const [data, setData] = useState();
    const {navigate, status, url} = useContext(Context);
    
    const fetchData = async() => {
        const result = await fetch(url);
        const data = await result.json();
        setData(data);
    };
    
    const goToPost = (event) => {
        const card = event.target;
        const id = card.className === 'card' ? card.id: card.parentNode.id;
        navigate(`posts/${id}`);
    };

    useEffect(() => {
        fetchData();
    }, [url, status]);
       
    return <Routes>
            <Route path='/' element={
                <div>
                    <ul className="card-list">
                        {data ? data.map(el => {
                            return <Card key={el.id} id={el.id} func={goToPost} created={el.created} post={el.post} />
                        }): null}
                    </ul>
                </div>
                }
            />
            <Route path=':id/*' element={ <Post /> } />
        </Routes>
};

export default MainPage;
