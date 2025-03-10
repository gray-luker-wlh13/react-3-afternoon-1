import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/${id}/${text}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/${id}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/${text}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {posts.map(post => (
            <Post 
            key={post.id} 
            date={post.date} 
            text={post.text} 
            id={post.id}
            updatPostFn={this.updatePost}
            deletePostFn={this.deletePost}
            createPostFn={this.createPost}/>
          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
