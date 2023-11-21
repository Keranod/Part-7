const _ = require('lodash')

const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    let sumOfLikes = 0

    blogs.forEach((blog) => {
        sumOfLikes += blog.likes
    })

    return sumOfLikes
}

const favoriteBlog = (blogs) => {
    let blogWithMostLikes = blogs[0]

    blogs.forEach((blog) => {
        if (blog.likes > blogWithMostLikes.likes) {
            blogWithMostLikes = blog
        }
    })

    return blogWithMostLikes
}

const mostBlogs = (blogs) => {
    // _.uniq gets only unique values
    // .map function within _.uniq creates new array of authors names
    // .map function of array created using _.uniq returns object with author name and blogs amount
    const authors = _.uniq(blogs.map(blog => blog.author)).map(author => {
        return {
            author,
            blogs: _.countBy(blogs, 'author')[author] || 0
            // iterates over blogs counting by author property
            // [author] retrives count from _.countBy of that author
            // || 0 just in case if author does not exist
        }
    })

    // return author name and amount of blogs that he has on the list
    return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
    // same as above function
    const authors = _.uniq(blogs.map(blog => blog.author)).map(author => {
        return {
            author,
            likes: _.reduce(_.filter(blogs, { author }).map(blog => blog.likes), (sum, n) => {
                return sum + n
            }, 0)
            // _.reduce sums likes
            // _.filter itterates over blogs and filters only objects with author name
            // .map creates array of likes for that author from each blog
        }
    })

    // returns author object with highest count of likes
    return _.maxBy(authors, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
