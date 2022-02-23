import blogService from "../services/blog-service"

const createFrom = ({title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs}) => {
    const sumbitHandler = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        const result = await blogService.create(newBlog)
        if (result.data) {
            setBlogs(blogs.concat(result.data))
        }
    }
    return (
        <form onSubmit={sumbitHandler}>
            <div>
                title: 
                    <input 
                        type='text'
                        name='title'
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    
            </div>
            <div>
                author: 
                    <input
                        type='text'
                        name='author'
                        onChange={(event) => setAuthor(event.target.value)}
                    />
            </div>
            <div>
                url: 
                    <input 
                        type='text'
                        naem='url'
                        onChange={(event) => setUrl(event.target.value)}
                    />
            </div>
            <button type="submit">add blog</button>
        </form>
    )
}

export default createFrom