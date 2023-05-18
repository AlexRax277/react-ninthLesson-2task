import { useState } from "react";
import Form from "./Form.js";

/**
 * Компонент-карточка создания поста
 */
const NewPost = () => {
    const [form, setForm] = useState({ input: '' });

    return <Form form={form} 
                setForm={setForm} 
                method='POST'
                id=''
                name='Новый пост'
                btn='Опубликовать'
            />      
};

export default NewPost;
