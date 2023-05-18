import { useState, useEffect, useContext } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import Card from "./Card.js";
import WithButtons from "./HOC/withButtons.js";
import ChangePost from "./ChangePost.js";
import { Context } from "./Context/Context.js";

/**
 * Компонент-пост
 * пропсы отсутствуют, данные берутся с помощью useParams (это id из строки запроса), остальное из контекста
 * на сервер отправляется GET-запрос с указанием id поста в строке запроса
 * роутит либо на пост, либо на карточку изменения поста 
 */
const Post = () => {
    const [post, setPost] = useState();
    const [requestCompleted, setRequestCompleted] = useState(false);
    const {status, setStatus, navigate, url} = useContext(Context);
    const postId = useParams().id;

    const fetchData = async() => {
        const result = await fetch(`${url}/${postId}`);
        const data = await result.json();
        setPost(data.post);
        setRequestCompleted(true);
    };
    
    useEffect(() => {
        fetchData();
    }, [postId, status]);

    const CardWithButtons = WithButtons(Card);

    return <div>
        { requestCompleted && post ? 
            <Routes>
                <Route path='/' element={ <CardWithButtons id={post.id}
                                                        created={post.created} 
                                                        post={post.post}
                                                        setStatus={setStatus} 
                                                        navigate={navigate}
                                                        url={url}
                                            /> } 
                />
                <Route path='change' element={ <ChangePost id={post.id} text={post.post}/> } />
            </Routes>
        : <div>{`Поста с таким id - ${postId} нет в БД`}</div> }
    </div> 
   
};

export default Post;
