import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/loader/MyLoader";
import PostComments from "../components/PostComments";
import '../style/app.css'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)

    })
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsById(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, []);
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <MyLoader></MyLoader>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Коментарии:</h1>
            {isComLoading
                ? <MyLoader/>
                : <PostComments comments={comments}></PostComments>
            }
        </div>
    );
};

export default PostIdPage;