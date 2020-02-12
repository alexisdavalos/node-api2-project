import React from 'react'
import axios from 'axios'

const Post = (props) =>{
    console.log('Props Inside Post.js:', props)
    const handleDelete = () =>{
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/posts/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = async () =>{
        props.setNewPost({title: props.post.title, contents: props.post.contents})
     
        // await axios.post('http://localhost:5000/api/posts/', props.newPost)
        // .then(res=> console.log('successfully updated post', res))
        // .catch(err => console.log(err));
        // console.log('updated post!')
    }

    return(
        <div className='user'>
            <h5>Title: {props.post.title}</h5>
            <p>Contents: {props.post.contents}</p>
            <button className='deleteButton' onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => handleUpdate()}>Update</button>
        </div>
    )
}

export default Post;