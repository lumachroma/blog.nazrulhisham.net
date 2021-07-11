import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

const MostHitPost = () => {
  const { data, error } = useSWR('/api/public/posts/most-hit', fetcher)

  if (error) return <p className="lead">Failed to load</p>
  if (!data) return (<p className="lead"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</p>)
  if (!data.data || !data.success) return (<p className="lead">No data to show</p>)

  const popularPosts = data?.data

  return (
    <>
      <div>
        <ul className="list-unstyled">
          {popularPosts && popularPosts.map((post) => {
            const formatedDate = new Date(post.posted).toLocaleDateString()
            return (
              <li key={post.slug}>
                <div className="d-flex align-items-start">
                  <i className="bi bi-arrow-right flex-shrink-0 me-3 fs-3 text-success" />
                  <div>
                    <Link href={`/blog/${post.slug}`}>
                    <a className="text-decoration-none text-reset">
                    <h4 className="fw-light">{post.title}</h4>
                    </a>
                    </Link>
                    <p className="fw-lighter">
                      <span>{post.description}</span>{' '}
                      <br />
                      <small className="text-muted">{formatedDate}</small>{' '}
                      <small className="text-muted">{post.hitsCount} hits</small>{' '}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default MostHitPost