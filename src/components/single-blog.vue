<template>
	<div id="single-blog">
		<h2>{{ blog.title }}</h2>
		<p>作者: {{ blog.author }}</p>
		<p>分类</p>
		<ul>
			<li v-for="category in blog.categories" :key="category">
				{{ category }}
			</li>
		</ul>
		<button @click="deleteSingleBlog()">删除</button>
		<router-link :to="'/edit/' + id">编辑</router-link>
		<p>{{ blog.content }}</p>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'single-blog',
	data () {
		return {
			// id: this.$toute.params.id,
			id: this.$route.params.id,
			blog: {}
		}
	},
	created () {
		// this.$http.get('/static/posts.json?id=' + this.id)
		// 	.then(res => {
		// 		console.log('res', res)
		// 	})

		// this.$http.get('/posts/' + this.id + '.json')
		axios.get('/posts/' + this.id + '.json')
			.then(res => {
				// console.log('res', res.data)
				this.blog = res.data
			})
	},
	methods: {
		deleteSingleBlog () {
			axios.delete('/posts/' + this.id + '.json')
				.then(res => {
					this.$router.push({path: '/'})
				})
		}
	}
}
</script>

<style scoped>
#single-blog {
	max-width: 960px;
	margin: 0 auto;
	padding:  0 auto;
	background: #eee;
	border:  1px dotted #aaa;
}
</style>
