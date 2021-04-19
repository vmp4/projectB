import React from 'react'
import { useBreakpoint } from '../breakpoint'

function TestBreakpoint() {
  const breakpoints = useBreakpoint()

  const matchList = Object.keys(breakpoints).map((media) => (
    <li key={media}>
      {media} ---- {breakpoints[media] ? 'Yes' : 'No'}
    </li>
  ))
  console.log(breakpoints.sm)

  return <ol>{matchList}</ol>
}

export default TestBreakpoint
