const importScript = script => {
  return new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script')
    scriptEl.src = script
    scriptEl.addEventListener('load', resolve)
    document.head.appendChild(scriptEl)
  })
}

const getNewBlogPosts = () => {
  // TODO: API

  return Promise.resolve([
    {title: 'Hello, world!'},
    {title: 'Cats'},
    {title: 'Hello again'}
  ])
}

const makeNavEl = (link, text) => {
  return el('a.nav-item', {href: link}, text)
}

const makeHomeBlogPreviewEl = (post) => {
  return el('.home-blog-preview', [
    el('h1', post.title)
  ])
}

Promise.all([
  'lib/koel/koel.js'
].map(importScript)).then(() => {

  let newBlogPostsEl

  const generated = el('#generated-content', [

    // Nav ----
    el('#nav', [
      makeNavEl('#', 'Blog'),
      makeNavEl('#', 'People')
    ]),

    // Welcome ----
    el('#main-header', 'Welcome!'),

    // New blog posts ----
    newBlogPostsEl =
    el('#new-blog-posts')

  ])

  // Fill in blog posts ----
  getNewBlogPosts().then(posts => {
    for (let post of posts) {
      newBlogPostsEl.appendChild(makeHomeBlogPreviewEl(post))
    }
  })

  document.body.appendChild(generated)
})
