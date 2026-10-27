const API =  'https://jsonplaceholder.typicode.com'
import { Suspense } from "react";
import Link from "next/link";
7
type prg = {title:string, id:number}

async function ListaPosts() {
    const res = await fetch(`${API}/posts`)
    const lista: prg[] = await res.json()
    return(
        <ul>
            {lista.map((u) => (
                <li key={u.id}>
                    <Link href={`/posts/${u.id}`}>
                    {u.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default function PostsPage() {
  return (
    <Suspense fallback={<p>A carregar...</p>}>
      <ListaPosts />
    </Suspense>
  );
}