import { useState } from "react";
import Form from "./Form.js";

/**
 * Компонент-карточка изменения поста
 * @param {id} номер поста 
 * @param {text} текст поста 
 * пропсы прокидываются из родителя Post
 */
const ChangePost = ({id, text}) => {
    const [form, setForm] = useState({ input: text });

    return <Form form={form} 
                setForm={setForm} 
                method='PUT'
                id={id}
                name='Редактировать пост'
                btn='Сохранить'
            />   
};

export default ChangePost;
