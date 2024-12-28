import React from 'react'
import Header from '../Components/Header'
import untitled from '../Untitled.png'


export default function Landing() {
  return (
    <>
      <Header />
      <section id="about-us">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati expedita quaerat earum,
          voluptatem illum fugiat ratione consequatur. We strive to deliver innovation, quality, and
          excellence to every aspect of our services.
        </p>
        <div className="features">
          <div className="feature">
            <h3>Our Mission</h3>
            <p>
              To empower businesses and individuals through innovative and sustainable solutions.
            </p>
          </div>
          <div className="feature">
            <h3>Our Vision</h3>
            <p>
              To be a global leader in delivering groundbreaking services that redefine industries.
            </p>
          </div>
          <div className="feature">
            <h3>Our Values</h3>
            <p>
              Integrity, excellence, and customer satisfaction form the foundation of everything we do.
            </p>
          </div>
          <div className="feature">
            <h3>Why Choose Us</h3>
            <p>
              We bring together innovation, expertise, and dedication to help you achieve your goals.
            </p>
          </div>
        </div>
      </section>
      <h2 style={{ textAlign: "center", fontSize: '34px' }}>Our Services</h2>
      <section id='services'>
        <div>
          <img src={untitled} alt="Service 1" />
          <h3>Service Title 1</h3>
          <p>Experience the best with our cutting-edge technology and reliable solutions.</p>
        </div>
        <div>
          <img src={untitled} alt="Service 2" />
          <h3>Service Title 2</h3>
          <p>Delivering innovation and efficiency in every aspect of our services.</p>
        </div>
        <div>
          <img src={untitled} alt="Service 3" />
          <h3>Service Title 3</h3>
          <p>Trust us to bring transparency and security to your supply chain.</p>
        </div>
      </section>
    </>
  )
}
