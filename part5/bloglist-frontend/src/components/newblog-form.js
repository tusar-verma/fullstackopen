import { useState } from 'react'

const NewBlogFrom = ({ sendBlog }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const sumbitHandler =  (event) => {
    event.preventDefault()
    sendBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={sumbitHandler}>
      <div>
                title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={(event) => setTitle(event.target.value)}
        />

      </div>
      <div>
                author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
                url:
        <input
          type='text'
          value={url}
          name='url'
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

export default NewBlogFrom