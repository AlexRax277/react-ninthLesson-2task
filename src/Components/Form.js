import { Context } from "./Context/Context.js";
import { useState, useEffect, useContext } from "react";

/**
 * Компонент-форма для создания или изменения поста 
 * (предусмотрено взаимодействие с сервером с помощью методов POST и PUT)
 * @param {form} текст поста (состояние компонента)
 * @param {setForm} функция изменения текста поста
 * @param {method} метод взаимодействия с сервером 
 * @param {id} номер поста
 * @param {name} название будущего компонента 
 * @param {btn} наименование кнопки, подтверждающей завершение 
 * пропсы прокидываются из родителя ChangePost или NewPost
 */
const Form = ({ form, setForm, method, id, name, btn }) => {
    const {setStatus, navigate, url} = useContext(Context);
    const [post, setPost] = useState();

    const handler = (event) => {
        event.preventDefault();
        setPost(form.input);
    };
    
    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'post': post})
        };

        if(post) {
            fetch(`${url}/${id}`, params)
                .then(data => {console.log(data)});
            setStatus(status => {return status ? false: true });
            goBack();
        };
    }, [post]);

    return <form className="form" autoComplete="off" onSubmit={handler}>
                <label htmlFor="input" className="label">{name}</label>
                <textarea className="input-pub" 
                        name="input" 
                        onChange={handleChange}
                        value={form.input}
                />
                <button className="btn-pub">{btn}</button>
                <span className="close" onClick={goBack}>✖</span>
            </form>
}

export default Form;
