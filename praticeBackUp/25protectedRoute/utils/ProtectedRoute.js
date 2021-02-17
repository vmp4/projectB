import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
  console.log(children)
  return (
    <Route
      {...rest}
      render={(props) =>
        children.props.isAuth === true ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
