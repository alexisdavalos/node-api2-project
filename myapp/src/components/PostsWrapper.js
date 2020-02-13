import React from 'react'
import Post from './Post'

const PostsWrapper = (props) =>{
    return(
        <>
         <h3>Posts In Database:</h3>
            <div className='usersWrapper'>
                {props.posts.map(post=>(
                    <Post setFetch={props.setFetch} key={post.id} post={post} newPost={props.newPost} setNewPost={props.setNewPost} updatePost={props.updatePost} setUpdate={props.setUpdate} />
                ))}
            </div>
        </>
    )
}

export default PostsWrapper;