import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import AddIcon from 'react-icons/lib/fa/plus-circle'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import AddPostIcon from 'react-icons/lib/fa/plus-circle'
import './App.css'

class App extends Component {
  state = {
    posts : [],
    categories : []
  }

  componentDidMount(){
    fetch('/posts',
      {
        headers: { 'Authorization': 'fer' }
      }
    )
      .then(res => res.json())
      .then(posts => {this.setState({ posts })
      console.log('post', posts)}
      )
      fetch('/categories',
      {
        headers: { 'Authorization': 'fercategories' }
      }
    )
      .then(res => res.json())
      .then(categories => {this.setState({ categories: categories.categories })}
      )
      
  }
  render() {
    var i =1
    return (
      <div className="App">
        
        <div className="sidenav">
            {this.state.categories.map( category =>
                <div key={i}> 
                    <a href="#">{category.name}</a>
                    {i=i+1}
                </div>)}
        </div>

        <Route exact path="/" render={() => (
          <div className="content">
              <h1>Posts</h1>
              {this.state.posts.map( post =>
              <div key={post.id}> 
                <div className="post-title">{post.title}</div>
                <div className="post-author">{post.author}</div>
                <div className="post-category">category:{post.category}</div> 
                <div className="container">
                    <div className="button-vote">
                        <CommentsIcon size={20} />
                        {post.commentCount}</div>
                    <div className="button-vote">
                      <button>
                        <UpVoteIcon size={20} />
                      </button>
                    </div>
                    <div className="button-vote">{post.voteScore}</div>
                    <div className="button-vote">
                      <button className="downVoteButton">
                          <DownVoteIcon size={20} />
                      </button>
                    </div>
                    <div className="button-vote">
                      <button >edit</button>
                    </div>
                    <div className="button-vote">
                      <button >delete</button>
                    </div>
                </div>
                <div className="new-post">
                  <Link
                      to="/create"
                      className="add-post"
                    ><AddPostIcon size={50} />
                      
                  </Link>
                </div>
            </div>)}
          </div>
        )} />

        


      </div>
    );
  }
}

export default App;
