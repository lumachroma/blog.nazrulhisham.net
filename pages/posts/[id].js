
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({ source, frontMatter }) => {
  return (
    <div className="container">
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <article>
        <h1 className="display-6">{frontMatter.title}</h1>
        <p className="fw-lighter">
          <small><mark>{frontMatter.date}</mark></small>
          {' '}
          {frontMatter.description}
        </p>
        <p>
          <Link href="/posts">
            <a className="text-decoration-none">Back</a>
          </Link>
        </p>
        <div>
          <MDXRemote {...source} />
        </div>
      </article>
      <p>
        <Link href="/posts">
          <a className="text-decoration-none">Back</a>
        </Link>
      </p>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { source, frontMatter } = await getPostData(params.id)
  return {
    props: {
      source,
      frontMatter,
    },
  }
}

export default Post