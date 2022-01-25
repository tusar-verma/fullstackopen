const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }else if (blogs.length === 1){
        return blogs[0].likes
    }else {
        return blogs.reduce(sum,0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    blogs.sort(compareByLikes)
    return {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
    }
}

const compareByLikes = (a, b) => {
    if (a.likes < b.likes) {
        return 1
    }else if (a.likes > b.likes) {
        return -1
    }else{
        return 0
    }
}

const sum = (previous, current) => {
    result = Number(previous) + Number(current.likes)
    return result
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}