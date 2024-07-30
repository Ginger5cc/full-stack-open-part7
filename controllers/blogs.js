const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs  = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})




blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
  const blog = new Blog(request.body)
  const user = await User.findById(request.decodedTokenId) 

  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }   

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor,  async(request, response) => {
  
  const user = await User.findById(request.decodedTokenId)
  const blog = await Blog.findById(request.params.id)
  console.log(`blog id is ${blog.id}`)
  console.log(`blog user id is ${blog.user}`)
  console.log("hello world")
  
  if ( blog.user.toString() === user.id.toString() ){
    const delBlog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else return response.status(401).json({ error: 'invalid user' })

  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())

  await user.save()

})



blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  const upblog = {
    title: body.title,
    author: body.author || 'default author',
    url: body.url,
    likes: body.likes || 0,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, upblog, { new: true })
  response.status(200).json(updatedBlog)

})

blogsRouter.post('/:id/comment', middleware.userExtractor, async(request, response) => {
  const comment = new Comment(request.body)
  const blog = await Blog.findById(request.params.id) 

  if (!comment.content ) {
    return response.status(400).json({ error: 'content missing' })
  }   
  comment.blogid = request.params.id
  const savedComment = await comment.save()

  response.status(201).json(savedComment)

})

  


module.exports = blogsRouter