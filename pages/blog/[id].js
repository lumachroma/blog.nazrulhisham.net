
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { getAllPostIds, getPostData } from '../../lib/posts'
import PageShell from '../../components/PageShell'
import Hits from '../../components/Hits'
import Likes from '../../components/Likes'

const components = {
  blockquote: (props) => <blockquote className="lead fw-lighter lh-sm bg-light m-2 p-2" {...props} />,
}

const Post = ({ source, frontMatter }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <div className="row">
        <div className=" col-10 col-md-11">
          <article>
            <h1 className="display-4">{frontMatter.title}</h1>
            <p className="lead fw-lighter">
              <small><mark>{frontMatter.date}</mark></small>
              {' '}
              {frontMatter.description}
            </p>
            {frontMatter.tags
              && Array.isArray(frontMatter.tags)
              && frontMatter.tags.length > 0
              && <p>
                {frontMatter.tags.map((tag, index) => {
                  return (
                    <span key={index}>
                      <span className="badge bg-light text-secondary">{tag}</span>
                      {' '}
                    </span>
                  )
                })}
              </p>
            }
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
        </div>
        <div className=" col-2 col-md-1">
          <Likes postSlug={id} />
          <Hits postSlug={id} />
        </div>
      </div>
    </>
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