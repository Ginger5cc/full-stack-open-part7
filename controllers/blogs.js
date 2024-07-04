const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs  = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async(request, response) => {
  const body = new Blog(request.body)
  const blog = new Blog ({
    title: body.title,
    autor: body.author || 'default author',
    url: body.url,
    likes: body.likes || 0,
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  const delBlog = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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

  


module.exports = blogsRouter