import moment from 'moment';

/**
 * Компонент-карточка отображения поста
 * @param {id} номер поста 
 * @param {func} функция открытия поста 
 * @param {created} дата создания поста 
 * @param {post} текст поста 
 * пропсы прокидываются из родителя Post
 */
const Card = ({ id, func, created, post }) => {
    return <li key={id} id={id} className="card" onClick={ func }>
        <span className='post-date'>{moment(created).format('HH:mm DD.MM.YYYY') }</span>
        <div className='post-text'>{post}</div>
    </li>
};

export default Card;
