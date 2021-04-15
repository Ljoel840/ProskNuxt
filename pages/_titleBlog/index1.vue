<template>
	<div>
		<h1>Detalle Blog</h1>
		<p>Article:{{article}}</p>
		<ul>
			<li v-for="b in blogs" :key="b.BlogPostId">
				{{b.BlogPostTitle}}
			</li>
		</ul>
	</div>
</template>
<script>
import extraerBlog from '@/middleware/extraerBlog'
  export default {
	  data() {
		  return {
			  blogs: []
		  }
	  },
    async asyncData({params}) {
    //   const article = await $content('articles', params.titleBlog).fetch()
		const article = params.titleBlog
		console.log('Articulo: ',params)
      return { article }
    },
	// async fetch() {
    //   this.blogs = await fetch(
    //     `${process.env.API_URL}dfs90016`,{method: 'POST'},{idEnc: ""}
    //   ).then(res => res.data.FrontBlogPost)
    // }
	async fetch(){
		this.blogs = await extraerBlog({idEnc: ""})
	}
  }
</script>