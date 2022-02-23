const blog = ({blogdata}) => {
    return (
        <div>
            {blogdata.title} {blogdata.author}
        </div>
    )
}

export default blog