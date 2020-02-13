import React from 'react'
import axios from 'axios'

const Post = (props) =>{
    console.log('Props Inside Post.js:', props)
    const handleDelete = (e) =>{
        e.preventDefault();
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/posts/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        props.setUpdate({...props.post})
    }

    return(
        <div className='user'>
            <h5>Title: {props.post.title}</h5>
            <p>Contents: {props.post.contents}</p>
            <button className='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
            <button onClick={(e) => handleUpdate(e)}>Update</button>
        </div>
    )
}

export default Post;