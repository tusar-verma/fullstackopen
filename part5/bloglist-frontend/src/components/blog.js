import { useState } from 'react'
import blogService from '../services/blog-service'

const Blog = ({ blogdata, refreshBloglist }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleButton = () => {
    setShowDetails(!showDetails)
  }

  const upvoteHandler = () => {
    const blogToSend = {
      author: blogdata.author,
      title: blogdata.title,
      url: blogdata.url,
      upvotes: blogdata.upvotes+1,
      user: blogdata.user.id
    }
    blogService.updateLike(blogdata.id, blogToSend)
    refreshBloglist()
  }

  const removeHandler = () => {
    if (window.confirm(`Remove blog "${blogdata.title}"?`)) {
      blogService.deleteBlog(blogdata.id)
      refreshBloglist()
    }
  }

  const showWhenVisible = () => {
    return(
      <div>
        <button onClick={toggleButton}>hide</button>
        <div style={{ display:'block' }}>
          <p>{blogdata.author}</p>
          <p>{blogdata.url}</p>
          <p>{blogdata.upvotes} <button onClick={upvoteHandler}>upvote</button></p>
          <button onClick={removeHandler}>remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blogdata.title}
      {
        showDetails ?
          showWhenVisible() :
          <button onClick={toggleButton}>view</button>
      }
    </div>
  )
}

export default Blog