import { Children } from "react";
import { Link } from "react-router-dom";

/**
 * Компонент высшего порядка
 * необходим для переиспользования компонента Card (без изменения самого компонента)
 * идет обращение к серверу с помощью метода DELETE
 * помимо основных пропсов компонента Card:
 * @param {url} урл
 * @param {setStatus} нужен для ререндеринга 
 * @param {navigate} для переброса по завершении взаимодействия с сервером
 * пропсы прокидываются из родителя Post
 */
const WithButtons = (Component) => (props) => {
    const toDelete = () => {
        fetch(`${props.url}/${props.id}`, { method: 'DELETE' })
            .then(props.setStatus(status => {return status ? false: true }))
        props.navigate('/posts');
    };

    return Children.map(Component(props), (Element) => {
        return <div className="post">
            {Element}
            <Link className="btn-change" to='change'>Изменить</Link>
            <button className="btn-delete" onClick={toDelete}>Удалить</button>
        </div>
    })
}

export default WithButtons;
