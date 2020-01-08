import useSWR from 'swr'
import Spinner from './spinner'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useMounted from '../lib/use-mounted'

export default function Indicator(props) {
  const mounted = useMounted()
  const { asPath } = useRouter()
  const active = mounted && localStorage.issgIndicator
  const [gotSuccess, setGotSuccess] = useState(false)

  const { data, error } = useSWR(
    () => (gotSuccess || !active ? null : 'revalidate-status'),
    {
      fetcher: async () => {
        const res = await fetch(asPath, {
          method: 'HEAD',
          headers: {
            pragma: 'no-cache'
          }
        })
        const status = (res.headers.get('x-now-cache') || '').toLowerCase()
        return status === 'hit' ? 'done' : 'revalidating'
      },
      refreshInterval: 500,
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    if (data === 'done') {
      setGotSuccess(true)
    }
  }, [data])

  return !active ? null : (
    <>
      <div className='issg-indicator'>
        {gotSuccess ? '✔️' : <Spinner size={24} color="#333333" />}
      </div>
      <style jsx>{`
        .issg-indicator {
          position: fixed;
          right: 35px;
          bottom: 35px;
        }
      `}</style>
    </>
  )
}
