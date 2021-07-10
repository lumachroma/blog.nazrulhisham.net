import { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

const Hits = ({ postSlug }) => {
  const endpoint = `/api/public/posts/${postSlug}/hits`
  const contentType = 'application/json'
  const { data, mutate } = useSWR(endpoint, fetcher)

  const hitsMeta = data?.data
  const hitsCount = hitsMeta?.hitsCount

  useEffect(() => {
    const registerHit = () => {
      fetch(endpoint, {
        method: 'PUT',
        headers: new Headers({ Accept: contentType, 'Content-Type': contentType }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            mutate(json.data) // Update the local data without a revalidation
          })
        }
      })
    }

    registerHit()
  }, [postSlug])

  return (
    <>
      <div className="text-center">
        <small><span className="fw-lighter">{hitsCount} hits</span></small>
      </div>
    </>
  )
}

export default Hits