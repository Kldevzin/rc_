import Link from "next/link"
import { notFound } from "next/navigation"
const API = 'https://jsonplaceholder.typicode.com'
type Post = {id:number,title:string,body:string}


export default async function Post_id({
    params,
}: {
    params: Promise<{id:string}>
}){
    const {id} = await params
    const res = await fetch(`${API}/posts/${id}`)
     if(!res.ok){
        notFound()
    }
    const post:Post = await res.json() 

    return(
        <div>
            <nav><Link href="/posts">voltar</Link></nav>
            <h1>{post.title}</h1>
            <p>{post.body}</p>   
        </div>
    )
}