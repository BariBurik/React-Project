import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom'

const PostItem = (props) => {
    const navigate = useNavigate()

    return (
        <div className='post'>
            <div className='post__content'>
                <strong className='post__title'>{props.number}. {props.post.title}</strong>
                <div className='post__description'>
                    <p>{props.post.body}</p>
                </div>
            </div>
            <div className='post__btns'>
                <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>
            </div>
        </div>
    );
};

export default PostItem;