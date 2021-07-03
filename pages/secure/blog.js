import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'
import PageSecuredShell from '../../components/PageSecuredShell'

const endpoint = `/api/secure/posts`
const contentType = 'application/json'

const Blog = ({ allPostsData }) => {
  const [isBusy, setIsBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let posted = []
    setIsBusy(true)
    for (let i = 0; i <= allPostsData.length; i++) {
      setTimeout(async () => {
        if (i < allPostsData.length) {
          const postData = allPostsData[i];
          const slug = postData.id
          const res = await fetch(`/api/secure/posts/${slug}`, {
            method: 'GET',
            headers: new Headers({ Accept: contentType }),
            credentials: 'same-origin',
          })
          const data = await res.json()
          console.log("useEffect Posted", data)
          if (data.success) {
            posted.push({ found: true, post: postData, posted: data.data, isActive: data.data.isActive })
          } else {
            posted.push({ found: false, post: postData, posted: {}, isActive: false })
          }
          setProgress(((i + 1) / allPostsData.length) * 100)
        } else {
          setPosts(posted)
          setIsBusy(false)
        }
      }, (500 * i));
    }
  }, [])

  const handlePostPut = async (index, method) => {
    if (method === 'POST' || method === 'PUT') {
      const posting = sanitizePosting({ ...posts[index].post })
      console.log("handlePost Posting", posting)

      let url = endpoint
      if (method === 'PUT') {
        url = `${endpoint}/${posting.slug}`
      }
      console.log("handlePost Url", url)

      const res = await fetch(url, {
        method: method,
        headers: new Headers({ Accept: contentType, 'Content-Type': contentType }),
        credentials: 'same-origin',
        body: JSON.stringify(posting),
      })
      const data = await res.json()
      console.log("handlePost Posted", data)

      if (data.success) {
        updatePosts(index, data)
      }
    }
  }

  const hanldeToggleActiveState = async (index, isActive) => {
    const posting = { ...posts[index].post }
    console.log("hanldeToggleActiveState ", posting, isActive)

    let url = endpoint
    if (isActive) {
      url = `${endpoint}/${posting.id}/activate`
    } else {
      url = `${endpoint}/${posting.id}/deactivate`
    }
    console.log("hanldeToggleActiveState Url", url)

    const res = await fetch(url, {
      method: 'PUT',
      headers: new Headers({ Accept: contentType, 'Content-Type': contentType }),
      credentials: 'same-origin',
    })
    const data = await res.json()
    console.log("hanldeToggleActiveState Posted", data)

    if (data.success) {
      updatePosts(index, data)
    }
  }

  function sanitizePosting(posting) {
    posting.slug = posting.id
    posting.posted = posting.date
    delete posting.id
    delete posting.date
    return posting
  }

  function updatePosts(index, newData) {
    const newPost = {
      ...posts[index],
      found: true,
      posted: newData.data,
      isActive: newData.data.isActive,
    }
    setPosts([
      ...posts.slice(0, index),
      newPost,
      ...posts.slice(index + 1)
    ])
  }

  return (
    <>
      <div className="py-2">
        <h1 className="display-4">Secure Blog</h1>
        <p className="lead">Blog posts administrative panel</p>
      </div>

      {/* <p>
        {JSON.stringify(posts)}
      </p> */}

      <div className="table-responsive">
        <table className="table table-sm table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">Posts</th>
              <th scope="col">Posted</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {!isBusy &&
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr key={post.post.id}>
                    <td>
                      <span>{post.post.id}</span><br />
                      <small>
                        <span>{post.post.title}</span><br />
                        <span className="d-inline-block text-truncate" style={{ maxWidth: "150px" }}>{post.post.description}</span><br />
                        <span>{post.post.tags.join(' ')}</span><br />
                        <span>{post.post.author}</span><br />
                        <span>{post.post.date}</span><br />
                      </small>
                    </td>
                    <td>
                      {post.found &&
                        <>
                          <span className="badge bg-success"><small>Posted</small></span>{' '}
                          {post.isActive && <i className="bi bi-check-circle-fill text-success" />}
                          {!post.isActive && <i className="bi bi-x-circle-fill text-danger" />}
                        </>
                      }
                      {!post.found && <span className="badge bg-danger"><small>Unposted</small></span>}
                    </td>
                    <td>
                      <Link href={`/blog/[id]`} as={`/blog/${post.post.id}`}>
                        <a className="btn btn-link" role="button"><i className="bi bi-file-earmark-post" /></a>
                      </Link>
                      <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <Link href={`/secure/post/[id]`} as={`/secure/post/${post.post.id}`}>
                          <a className="btn btn-outline-primary" role="button"><i className="bi bi-speedometer2" /></a>
                        </Link>
                        {!post.found &&
                          <>
                            <button
                              role="button"
                              className="btn btn-outline-primary"
                              onClick={() => { handlePostPut(index, 'POST') }}
                            >
                              <i className="bi bi-journal-plus" />
                            </button>
                          </>
                        }
                        {post.found &&
                          <>
                            <button
                              role="button"
                              className="btn btn-outline-primary"
                              onClick={() => { handlePostPut(index, 'PUT') }}
                            >
                              <i className="bi bi-journal-code" />
                            </button>
                            <button
                              role="button"
                              className="btn btn-outline-primary"
                              onClick={() => { hanldeToggleActiveState(index, !post.isActive) }}
                            >
                              {post.isActive && <i className="bi bi-journal-x" />}
                              {!post.isActive && <i className="bi bi-journal-check" />}
                            </button>
                          </>
                        }
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          }
        </table>
      </div>

      {isBusy &&
        <div className="py-2">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      }
    </>
  )
}

const SecureBlogPage = ({ allPostsData }) => (
  <PageSecuredShell name={"Secure Blog"}>
    <Blog allPostsData={allPostsData} />
  </PageSecuredShell>
)

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default SecureBlogPage