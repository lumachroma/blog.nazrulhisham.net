
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPostIds, getPostData } from '../../lib/posts'
import PageShell from '../../components/PageShell'

const components = {
  blockquote: (props) => <blockquote className="lead fw-lighter lh-sm bg-light m-2 p-2" {...props} />,
}

const Post = ({ source, frontMatter }) => {
  return (
    <article>
      <h1 className="display-4">{frontMatter.title}</h1>
      <p className="lead fw-lighter">
        <small><mark>{frontMatter.date}</mark></small>
        {' '}
        {frontMatter.description}
      </p>
      <p>
        <Link href="/blog">
          <a className="text-decoration-none">Back</a>
        </Link>
      </p>
      <div>
        <MDXRemote {...source} components={components} />
      </div>
      <p>
        <Link href="/blog">
          <a className="text-decoration-none">Back</a>
        </Link>
      </p>
    </article>
  )
}

const PostPage = ({ source, frontMatter }) => (
  <PageShell name={frontMatter.title}>
    <Post source={source} frontMatter={frontMatter} />
  </PageShell>
)

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

export default PostPage