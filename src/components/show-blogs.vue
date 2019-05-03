<template>
	<div id="show-blogs" v-theme:column="'wide'">
		<h1>博客总览</h1>
		<input type="text" name="" v-model="search" placeholder="搜索">

		<div class="single-blog" v-for="blog in filterBlogs" :key="blog.id">
			<router-link :to="'/blog/' + blog.id">
				<h2 v-rainbow>{{ blog.title | toUpperCase }}</h2>
			</router-link>
			<article>
				{{blog.content | snippet}}
			</article>
		</div>

	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'show-blogs',
	data () {
		return {
			blogs: [],
			search: ""
		}
	},
	created () {
		// http://jsonplaceholder.typicode.com/posts
		// this.$http.get("/posts.json").then(res => {
		axios.get("/posts.json").then(res => {
			return res.data
			// console.log(res.json())
			// this.blogs = res.body.slice(0, 10);
		}).then(data => {
			let blogsArray = [];
			// console.log(data, 'data')
			for (let key in data) {
				// console.log('key', key)
				data[key].id = key
				blogsArray.push(data[key])
			}
			this.blogs = blogsArray;
			// console.log('blogs', this.blogs)
		})
	},
	methods: {

	},
	computed: {
		filterBlogs () {
			return this.blogs.filter( blog => {
				return blog.title.match(this.search)
				// return boolean
			})
		}
	},
	filters: {
		toUpperCase (value){
			return value.toUpperCase()
		}
	},
	directives: {
		rainbow: {
			bind (el, binding, vnode) {
				el.style.color = '#' + Math.random().toString(16).slice(2, 8)
			}
		}
	}
}

</script>

<style scoped>
input[type="text"] {
	padding: 8px;
	width: 100%;
	box-sizing: border-box;
}
#show-blogs {
	max-width: 800px;
	margin: 0 auto;
}
#show-blogs a {
	text-decoration:  none;
}
.single-blog {
	margin: 20px 0px;
	padding: 20px;
	box-sizing: border-box;
	background: #eee;
	border: 1px dotted #aaa;
}
</style>
