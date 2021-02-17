import React from 'react'

function Footer() {
  return (
    <>
      <footer
        className="footer fixed-bottom"
        style={{
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div className="container">
          <p className="text-muted">版權所有(copy@right)</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
