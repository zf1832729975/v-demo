import ShowBlogs from './components/show-blogs.vue'
import Addblog from './components/add-blog.vue'
import SingleBlog from './components/single-blog.vue'
import EditBlog from './components/edit-blog.vue'

const _import = file => require('./components/' + file + '.vue').default
export default[
	{ path: '/', component: _import('show-blogs') },
	{ path: '/add', component: _import('add-blog') },
	{ path: '/blog/:id', component: _import('single-blog') },
	{ path: '/edit/:id', component: _import('edit-blog') },
	{ path: '/translate', component: _import('translate') }
]