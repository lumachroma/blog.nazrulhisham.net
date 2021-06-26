import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'
import PageShell from '../../components/PageShell'

const Blog = ({ allPostsData }) => {
  return (
    <>
      <div className="py-2">
        <h1 className="display-4">Blog</h1>
        <p className="lead">
          In my own time, I code and I create web / mobile applications, {' '}
          exploring with latest and popular technologies. {' '}
          With this blog, I wish I could share my experiences and musings {' '}
          by creating helpful and useful contents for my fellow developers and techies 👨‍💻👩‍💻. {' '}
          Enjoy and happy coding!
          </p>
      </div>

      {/* TODO: Most Popular Listings */}
      <div className="py-2">
        <h2>Most Popular</h2>
        <p className="fw-lighter lh-sm bg-light m-2 p-2">Coming soon...</p>
      </div>

      <div className="py-2">
        <h2>All Posts</h2>
        <ul className="list-unstyled">
          {allPostsData && Array.isArray(allPostsData) &&
            allPostsData.map((postData) => {
              return (
                <li key={postData.id}>
                  <h4 className="fw-light">
                    <Link href={`/blog/${postData.id}`}>
                      <a className="text-reset text-decoration-none">{postData.title}</a>
                    </Link>
                  </h4>
                  <p className="fw-lighter">
                    <small><mark>{postData.date}</mark></small>
                    {' '}
                    {postData.description}
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

const BlogPage = ({ allPostsData }) => (
  <PageShell name="Blog">
    <Blog allPostsData={allPostsData} />
  </PageShell>
)

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default BlogPage