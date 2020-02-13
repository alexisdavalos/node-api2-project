import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'

//components
import PostsWrapper from './components/PostsWrapper'


function App() {
  const [posts, setPosts] = useState([])
  const [fetch, setFetch]= useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    contents: ''
  })
  const [updatePost, setUpdate] = useState({
    id: '',
    title: '',
    contents: ''
  })
  console.log('Update Post:', updatePost)
  // console.log(newPost);
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts/') //gets list of posts
    .then(res => {
      console.log('response from localhost:5000:', res)
      console.log('setting data to posts State...', res.data)
      setPosts(res.data)
      console.log(`success`)
    })
    .catch( err => console.log(err))
    setFetch(false)
  },[fetch])

  const handleChange = (e) =>{
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    })
  };
  const handleUpdate = (e) =>{
    setUpdate({
      ...updatePost,
      [e.target.name]: e.target.value
    })
  };
  const handleNewPost = (e) =>{
    e.preventDefault()
    setFetch(true);
    axios
    .post('http://localhost:5000/api/posts', newPost)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setNewPost({title: '', contents: ''})
  }
  const handleUpdatePost = async (e) =>{
    e.preventDefault()
    console.log('....updating post.....')
    // setFetch(true);
    axios
    .put(`http://localhost:5000/api/posts/${updatePost.id}`, updatePost)
    .then(setFetch(true))
    .catch()
    setUpdate({title:'', contents: ''})
    setFetch(false);
    
  }
  console.log(`posts State:`, posts)
  return (
    <div className="App">
      <div className="App-Wrapper">
      <header className="App-header">
 
          <h1>Node API II Project</h1>
          <div className='Box'>
            <form onSubmit={e => handleNewPost(e)}>
              <h3>Add New Post</h3>
              <label>Title</label>
              <input
                name='title'
                value={newPost.title}
                onChange={handleChange}
              />
              <label>Contents</label>
              <input
                name='contents'
                value={newPost.contents}
                onChange={handleChange}
              />
              <button>Submit</button>
            </form>
            <form onSubmit={e => handleUpdatePost(e)}>
            <h3>Edit Post</h3>
              <label>Title</label>
              <input
                name='title'
                value={updatePost.title}
                onChange={handleUpdate}
              />
              <label>Contents</label>
              <input
                name='contents'
                value={updatePost.contents}
                onChange={handleUpdate}
              />
              <button>Submit</button>
            </form>
          </div>
          <div>
            <PostsWrapper newPost={newPost} setNewPost={setNewPost} updatePost={updatePost} setUpdate={setUpdate} setFetch={setFetch} posts={posts}/>
          </div>
      </header>
      </div>
    </div>
  );
}

export default App;
