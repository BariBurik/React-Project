import React from 'react';

const PostComments = ({comments}) => {
    return (
        <div>
            {comments.map(comm =>
                    <div className='post__comments'>
                        <h5 className='post-comments-item'>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>)}
        </div>
    );
};

export default PostComments;