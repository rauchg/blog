import useMounted from "../lib/use-mounted"
import { useEffect, useState } from "react"

export default () => {
  const mounted = useMounted()
  const [enabled, setEnabled] = useState(mounted && localStorage.issgIndicator)

  useEffect(() => {
    setEnabled(localStorage.issgIndicator)
  }, [mounted])

  return (
    <button onClick={() => {
      if (enabled) delete localStorage.issgIndicator
      else localStorage.issgIndicator = true
      setEnabled(localStorage.issgIndicator)
    }}>{enabled ? 'Disable' : 'Enable'} indicator</button>
  )
}
