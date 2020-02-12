import React from 'react'
import axios from 'axios'

const Post = (props) =>{

    const handleDelete = () =>{
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/posts/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = () =>{
        
    }

    return(
        <div className='user'>
            <h5>Title: {props.post.title}</h5>
            <p>Contents: {props.post.contents}</p>
            <button className='deleteButton' onClick={() => handleDelete()}>Delete</button>
            <button>Update</button>
        </div>
    )
}

export default Post;