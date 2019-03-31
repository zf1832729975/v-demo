<template>
	<div id="add-blog">
		<form v-if="!submmited">
			<label>博客标题</label>
			<input type="text" name="" v-model="blog.title" required />
			<label>博客内容</label>
			<textarea v-model="blog.content"></textarea>

			<div id="checkboxes">
				<label>Vue.js</label>
				<input type="checkbox" name="" value="Vue.js" v-model="blog.categories">
				<label>Node.js</label>
				<input type="checkbox" name="" value="Node.js" v-model="blog.categories">
				<label>React.js</label>
				<input type="checkbox" name="" value="React.js" v-model="blog.categories">
				<label>Angular4</label>
				<input type="checkbox" name="" value="Angular4" v-model="blog.categories">
			</div>
			<label>作者：</label>
			<select v-model="blog.author">
				<option v-for="(author, index) in authors" :key="index">{{ author }}</option>
			</select>
			<!-- 只能点击一次 -->
			<button @click.prevent="post" :disabled="disabled">添加博客</button>
		</form>

		<hr />

		<div v-if="submmited">
			<h3>你的博客发布成功</h3>
		</div>

		<div id="preview">
			<h3>博客总览</h3>
			<p>博客标题： {{ blog.title }} </p>
			<p>博客内容：</p>
			<p>{{ blog.content }}</p>
			<p>博客分类</p>
			<ul>
				<li v-for="(categorie, index) in blog.categories" :key="index">{{ categorie }}</li>
			</ul>
			<p>作者: {{ blog.author }}</p>

		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: 'add-blog',
	data () {
		return {
      disabled: false,
			blog: {
				title: "",
				content: "",
				categories: [],
				author: "",
				date: new Date()
			},
			authors: ["zhoufei", "menmory", "dark", "ik", "jkems"],
			submmited: false
		}
	},
	created () {

	},
	methods: {
		post () {
      // this.$http.post("/posts.json", this.blog)
      this.disabled = true
			axios.post("/posts.json", this.blog)
				.then(data => {
					// data.body 里可以拿到数据
					// console.log(data);
					this.submmited = true;
				}).catch(() => {
          this.disabled = false
          alert('没有添加成功, 请重新提交')
        })
		}
	},
}
</script>

<style scoped>

#add-blog * {
	box-sizing: border-box;
}

#add-blog {
	margin: 20px auto;
	max-width: 1260px;
	padding: 20px;
}

label {
	display: block;
	margin: 20px 0 10px;
}

input[type="text"], textarea, select {
	display: block;
	width: 100%;
	padding: 8px;
}

textarea {
	height: 200px;
}

#checkboxes label {
	display: inline-block;
	margin-top:  0;
}

#checkboxex input {
	display: inline-block;
	margin-right: 10px;
}

button {
	display: block;
	margin: 20px 0px;
	background-color: crimson;
	color: #fff;
	border: 0;
	padding: 14px;
	border-radius: 4px;
	font-size:  18px;
	cursor: pointer;
}

/*   博客总览
---------------------*/

#preview {
	padding: 10px 20px;
	border:  1px dotted #ccc;
	margin:  30px 0;
}

h3 {
	margin-top: 10px;

}
</style>
