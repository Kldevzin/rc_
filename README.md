# Projeto Next.js · Curso Profissional TGPSI (2º ano)

Projeto de estudo em **Next.js (App Router) com TypeScript**. Ele é construído ao longo das aulas e cada aula acrescenta coisas ao mesmo projeto.

| Aula | PowerPoint | O que acrescenta ao projeto |
|---|---|---|
| 2 | *NextJS - Componentes e Estado* | `layout.tsx` com menu, componentes, lista de tarefas (`/tarefas`) |
| 3 | *NextJS - Dados reais e rotas dinâmicas* | mini-blog com dados de uma API (`/posts` e `/posts/[id]`) |

> Os dois PowerPoints acompanham este repositório. Os números de slide indicados abaixo (por exemplo, "A3 · slide 8") referem-se a eles: **A2** = Aula 2, **A3** = Aula 3.

---

## Como executar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` no navegador.

---

## Estrutura de pastas

```
app/
├── layout.tsx              → menu e rodapé, aparecem em todas as páginas
├── page.tsx                → página inicial (/)
├── components/             → componentes reutilizáveis (Aula 2)
│   └── ListaTarefas.tsx
├── tarefas/
│   └── page.tsx            → /tarefas
└── posts/
    ├── page.tsx            → /posts          (lista de posts)
    ├── loading.tsx         → ecrã de espera de /posts
    └── [id]/
        └── page.tsx        → /posts/1, /posts/2, ... (um post)
```

**Regra base (A1):** uma pasta dentro de `app/` é uma rota, e o ficheiro `page.tsx` é a página dessa rota.

---

## Progresso do exercício do mini-blog (A3 · slide 13)

- [ ] 1. Lista de posts (`app/posts/page.tsx`)
- [ ] 2. Links para cada post e item no menu
- [x] 3. Rota dinâmica `app/posts/[id]/page.tsx`
- [x] 4. Mostrar o post (título, texto e link "voltar")
- [ ] 5. `loading.tsx`
- [x] 6. Post que não existe (`notFound()`)

---

# Conceitos explicados

## 1. API e JSON (A3 · slide 4)

Uma **API** é uma forma de pedir dados a outro computador através de um URL. Quem faz o pedido recebe uma **resposta em JSON**, um texto com o mesmo formato dos objetos de JavaScript.

Este projeto usa a API de treino **JSONPlaceholder**:

| Endereço | O que devolve |
|---|---|
| `/posts` | lista com 100 posts |
| `/posts/1` | só o post número 1 |
| `/users` | lista de utilizadores |

Base: `https://jsonplaceholder.typicode.com`

Dá para ver a resposta abrindo o endereço diretamente no navegador.

## 2. `async` e `await` (A3 · slides 5 e 6)

Buscar dados demora, porque o outro computador precisa de responder.

- **`async`** na função avisa que lá dentro há coisas que demoram.
- **`await`** diz "espera aqui até a resposta chegar".

Sem o `await`, a variável guarda uma **Promise** (uma promessa de resposta) em vez dos dados. É daí que vem o erro `[object Promise]`.

> **Regra prática:** se uma função começa com `fetch` ou devolve uma Promise, leva `await`.

## 3. `fetch` e `res.json()` (A3 · slide 5)

```tsx
const res = await fetch(`${API}/users`)          // faz o pedido
const lista: Utilizador[] = await res.json()      // transforma em objetos
```

1. `fetch` faz o pedido ao URL e devolve a resposta (`res`).
2. `res.json()` converte o texto da resposta em objetos que o JavaScript entende.
3. Os **dois** levam `await`.

## 4. Server Component (A3 · slide 6)

Por defeito, as páginas do Next.js correm **no servidor**. É por isso que podem ser `async` e fazer `fetch` diretamente.

Vantagens: a página chega ao navegador já com os dados, as chaves e os acessos secretos não saem do servidor, e não é preciso `useState` nem `useEffect` para guardar os dados.

**Atenção:** um componente com `'use client'` **não pode** ser `async`. Nesse caso, o `fetch` é feito na página, e os dados passam para o componente por **props**.

## 5. Rota dinâmica `[id]` (A3 · slide 7)

Uma pasta com **parênteses retos** serve para todos os valores naquela posição do URL:

```
app/utilizadores/[id]/page.tsx   →   /utilizadores/1
                                     /utilizadores/2
                                     /utilizadores/...
```

- Escreve-se a página **uma vez** e ela serve para todos os registos.
- O nome dentro dos parênteses é o **nome do parâmetro**. `[id]`, `[slug]` e outros nomes funcionam.
- Tem de ser `[id]`, e não `(id)`, `{id}` ou `id`.

## 6. `params` (A3 · slide 8)

O Next.js entrega à página o valor que está no URL na prop `params`:

```tsx
export default async function Utilizador({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // "id" tem o valor que estava no URL
}
```

- `params` é uma **Promise**, por isso leva `await`.
- O nome em `{ id: string }` tem de ser **igual** ao nome da pasta `[id]`.
- O valor chega sempre como **texto** (`"1"`, e não `1`). Para número, usa-se `Number(id)`.
- Em tutoriais antigos (Next.js 13 e 14) aparece `params.id` sem `await`. Em versões recentes isso já não funciona.

## 7. Template strings: crases e `${ }` (A3 · slides 5 e 9)

Servem para montar um texto com variáveis lá dentro:

```tsx
const API = 'https://jsonplaceholder.typicode.com'
const id = '5'

`${API}/users/${id}`   // → "https://jsonplaceholder.typicode.com/users/5"
```

- Tem de ser com **crases** (`` ` ``), e não aspas.
- Cada variável entra num `${ }`: o `$`, depois `{`, o nome e `}`.
- O que está fora de `${ }` é texto normal.

## 8. `type` em TypeScript (A2 · slide 5)

Descreve a "forma" de um objeto, isto é, que campos tem e de que tipo:

```tsx
type Utilizador = { id: number; name: string; email: string }
```

- Tipos básicos: `string` (texto), `number` (número), `boolean` (verdadeiro/falso).
- `Utilizador[]` = **vários** utilizadores (array). `Utilizador` = **um só**.
- O tipo só precisa de listar os campos que vão ser usados, e não todos os que a API devolve.
- Ajuda o editor a avisar quando se usa um campo que não existe.

## 9. Erro 404 com `notFound()` e `res.ok` (A3 · slide 11)

Quando se pede algo que não existe (por exemplo, o post 999), a API responde com erro.

- `res.ok` é `true` se o pedido correu bem e `false` se não.
- `!res.ok` lê-se "o pedido **não** correu bem".
- `notFound()` (importada de `next/navigation`) mostra a página 404 do Next.js.

O `if` fica **antes** do `return`, no corpo da função, e é boa prática colocá-lo logo depois do `fetch`. Assim a página para antes de tentar usar dados que não existem.

> Dentro do JSX (`return`) só cabem **expressões**. Um `if` normal fica sempre antes do `return`.

## 10. `<Link>` (A2 · slide 3)

Navega entre páginas **sem recarregar** o site todo. Vem de `next/link`:

```tsx
import Link from 'next/link'

<Link href="/posts">Voltar</Link>
```

Com valores variáveis, usa-se uma template string: `` href={`/utilizadores/${u.id}`} ``.

## 11. JSX (A2 · slides 4 a 7)

- O `return` de um componente só pode devolver **um elemento**. Para vários, agrupa-se com um `<div>` (ou outro elemento) por fora.
- Dentro do JSX, o que está entre `{ }` é JavaScript: `{post.title}`.
- Usa-se `className` em vez de `class`.
- Componentes começam com **letra maiúscula** (`Utilizador`, e não `utilizador`).

---

# Conceitos da Aula 2 (para consulta)

## `layout.tsx` (A2 · slide 4)
É o esqueleto do site. O que se põe lá (menu, rodapé) aparece em todas as páginas. O `{children}` é o "buraco" onde entra a página atual. Ao mudar de página, só o `{children}` muda.

## Props (A2 · slide 5)
Dados que entram num componente, como os parâmetros de uma função. Em `.tsx`, cada prop leva um tipo. Texto vai entre aspas (`nome="Ana"`); números e variáveis entre `{ }` (`nota={17}`).

## Listas com `.map()` e `key` (A2 · slide 6)
```tsx
{alunos.map((a) => (
  <li key={a.id}>{a.nome}</li>
))}
```
`.map()` transforma cada item do array num elemento. A `key` tem de ser **única** (use um `id`) e serve para o React saber o que mudou. Evite usar o índice quando a lista pode mudar.

## Renderização condicional (A2 · slide 7)
- Ternário `? :` mostra uma coisa **ou** outra.
- `&&` mostra algo só se a condição for verdadeira.

## `useState` (A2 · slides 8 e 9)
```tsx
const [contagem, setContagem] = useState(0)
```
Guarda um valor que, ao mudar, **atualiza o ecrã**. Tem de ser alterado com a função `set...`, nunca com `contagem = 5`. Com listas, cria-se um array novo (`[...lista, novo]`) em vez de usar `push`.

## `'use client'` (A2 · slide 10)
Põe-se na **primeira linha** de um componente que usa `useState` ou eventos (`onClick`, `onChange`). Regra prática: deixar tudo no servidor e usar `'use client'` só no componente pequeno que precisa de interatividade.

---

# Erros comuns e soluções

| Sintoma | Causa provável | Solução |
|---|---|---|
| Aparece `[object Promise]` ou "Cannot read properties of undefined" | Falta um `await` | `await` no `fetch` e no `res.json()` |
| `params.id` dá `undefined` | Código antigo sem `await` | `const { id } = await params` |
| 404 em todos os ids | Pasta com nome errado | Tem de ser `[id]`, com parênteses retos |
| Erro com `async` e `'use client'` | Client Component não pode ser `async` | Fazer o `fetch` na página e passar por props |
| Página em branco em `/posts/999` | Falta verificar `res.ok` | `if (!res.ok) notFound()` |
| "useState only works in Client Components" | Falta `'use client'` | Pôr `'use client'` na 1.ª linha |
| Aviso "unique key" na consola | `.map()` sem `key` | Pôr `key={item.id}` |
| `class` não funciona | Palavra reservada em JSX | Usar `className` |

---

# Recursos

- Documentação do Next.js: https://nextjs.org/docs
- Aprender Next.js: https://nextjs.org/learn
- Aprender React: https://react.dev/learn
- API de treino: https://jsonplaceholder.typicode.com
