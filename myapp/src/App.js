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
  console.log(newPost);
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
  const handleSubmit = (e) =>{
    e.preventDefault()
    setFetch(true);
    axios
    .post('http://localhost:5000/api/posts', newPost)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setNewPost({title: '', contents: ''})
  }
  console.log(`posts State:`, posts)
  return (
    <div className="App">
      <div className="App-Wrapper">
      <header className="App-header">
 
          <h1>Node API II Project</h1>
          <form onSubmit={e => handleSubmit(e)}>
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
          <div>
            <PostsWrapper setFetch={setFetch} posts={posts}/>
          </div>
      </header>
      </div>
    </div>
  );
}

export default App;
