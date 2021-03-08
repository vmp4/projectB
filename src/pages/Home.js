import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'

function Home() {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://image1.suning.cn/uimg/MFS/show/152908249478836372.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.alicdn.com/imgextra/i2/1047006310/TB2qQCzdHplpuFjSspiXXcdfFXa_!!1047006310-0-headline_editor.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.alicdn.com/imgextra/i4/2984114874/TB2TXnxd80lpuFjSszdXXcdxFXa_!!2984114874-2-headline_editor.png_2200x2200Q50s50.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="jumbotron container">
        <h1 className="display-4">Navbar、Footer Example!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button className="btn btn-primary btn-lg" href="#">
          Learn more
        </button>
      </div>
      <div className="jumbotron container">
        <h1 className="display-4">Navbar、Footer Example!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button className="btn btn-primary btn-lg" href="#">
          Learn more
        </button>
      </div>
      <div className="jumbotron container">
        <h1 className="display-4">Navbar、Footer Example!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button className="btn btn-primary btn-lg" href="#">
          Learn more
        </button>
      </div>
    </>
  )
}

export default Home
