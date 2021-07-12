import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

const MAX_LIKES_HIT = 10 //TODO: move into .env

const Likes = ({ postSlug }) => {
  const endpoint = `/api/public/posts/${postSlug}`
  const contentType = 'application/json'

  const [loading, setLoading] = useState(false)
  const { data, error, mutate } = useSWR(`${endpoint}/likes`, fetcher)

  const likesMeta = data?.data
  const likesCount = likesMeta?.likesCount
  const visitorLikesCount = likesMeta?.likes[0].count
  const progress = Math.floor((visitorLikesCount / MAX_LIKES_HIT) * 100)

  const getHeartIcon = () => {
    if (progress < 10) return ' bi-heart'
    else if (progress < 100) return ' bi-heart-half'
    else return ' bi-heart-fill'
  }

  const getHeartColor = () => {
    if (progress < 30) return ` text-muted`
    else if (progress < 60) return ` text-info`
    else return ` text-primary`
  }

  const handleGiveLike = () => {
    if (visitorLikesCount < MAX_LIKES_HIT) {
      setTimeout(() => {
        fetch(`${endpoint}/give-like`, {
          method: 'PUT',
          headers: new Headers({ Accept: contentType, 'Content-Type': contentType }),
        }).then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              mutate(json.data) // Update the local data without a revalidation
            })
            setLoading(false)
          } else {
            setLoading(false)
            //console.log(`Failed to give like. ${response.status}: ${response.statusText}`)
          }
        }).catch((err) => {
          setLoading(false)
          //console.log(`Failed to give like. Error: ${err}`)
          //throw new Error(err)
        })
      }, 1000)
    }
  }

  return (
    <>
      <div className="text-center">
        <a role="button" className="btn btn-link" onClick={handleGiveLike}>
          <i className={`bi ${getHeartIcon()} ${getHeartColor()} fs-3`} />
        </a>
        <div className="progress" style={{ height: "3px" }}>
          <div className="progress-bar bg-info" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>{' '}</p>
        <small><span className="fw-lighter">{likesCount} likes</span></small>
      </div>

    </>
  )
}

export default Likes