import React from 'react';
import {usePagesPagination} from "../../../hooks/usePagination";

const MyPagination = ({totalPages, page, changePage}) => {
    let pagesArray = usePagesPagination(totalPages)
    return (
        <div className='page__wrapper'>
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}>{p}</span>)}
        </div>
    );
};

export default MyPagination;