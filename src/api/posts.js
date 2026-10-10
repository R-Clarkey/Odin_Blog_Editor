import { apiConnect } from "./client.js"

export const getPosts = () =>
	apiConnect("/posts")

export const getMyPosts = () =>
    apiConnect("/posts/me")

export const getPost = (id) =>
	apiConnect(`/posts/${id}`, {
		method: "GET"
	})

export const createPost = (post, token) =>
	apiConnect("/posts", {
		method: "POST",
		token,
		body: JSON.stringify(post),
	})

export const updatePost = (id, changes) =>
	apiConnect(`/posts/${id}`, {
		method: "PATCH",
		body: JSON.stringify(changes),
	})

export const deletePost = (id, token) =>
	apiConnect(`/posts/${id}`, {
		method: "DELETE",
		token,
	})
