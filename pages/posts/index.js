import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'

const Posts = ({ allPostsData }) => {
  return (
    <div className="container">
      <Head>
        <title>Posts</title>
      </Head>
      <h1 className="display-4">nazrulhisham</h1>
      <p className="lead">Some descriptional paragraphs here. Some more descriptional paragraphs here.</p>

      <h2>Posts</h2>
      <ul className="list-unstyled">
        {allPostsData && Array.isArray(allPostsData) &&
          allPostsData.map((postData) => {
            return (
              <li key={postData.id}>
                <h4 className="fw-light">
                  <Link href={`/posts/${postData.id}`}>
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
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default Posts