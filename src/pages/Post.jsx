import { useEffect, useState } from "react"
import { getPost } from "../api/posts"
import { useParams } from "react-router-dom"

export default function Post() {
    const { id } = useParams()
    const [post, setPost] = useState()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function loadPost() {
            try {
                const data = await getPost(id)
                setPost(data)
                console.log("Post", data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadPost()
    }, [])


    return (
        <>
        </>
    )
}