import React, {useEffect, useMemo, useRef, useState} from 'react'
import "../style/app.css"
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import {usePosts, useSortedPosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/loader/MyLoader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from '../utils/pages'
import {usePagesPagination} from "../hooks/usePagination";
import MyPagination from "../components/UI/pagination/MyPagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    // const bodyInputRef = useRef()
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = Number(response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page+1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit]);

    const createPost = (newPost) =>  {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (removingPost) => {
        setPosts(posts.filter(p => p.id !== removingPost.id) )
    }

    const changePage = (page) => {
        setPage(page)
    }
    let pagesArray = usePagesPagination(10)
    return (
        <div className='App'>
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <h2 style={{marginBottom: '10px'}}>Создание поста</h2>
                <PostForm create={createPost}></PostForm>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}>
            </PostFilter>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'}
                ]}
            >

            </MySelect>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'}></PostList>
            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <MyLoader/>
                </div>
            }
            <div ref={lastElement} style={{height: '10px'}}></div>
            <MyPagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}></MyPagination>
        </div>
    );
}


export default Posts;