import React from 'react'

export default function Track() {
  return (
    <>
      <section className='trackProduct'>
        <h2 style={{fontSize:'30px'}}>Track your Product</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quos neque accusamus dolorum, sit eaque nesciunt dolores repellendus, temporibus placeat optio quaerat excepturi ipsum!</p>
        <form>
          <input type="text" placeholder='Enter the product ID' />
          <button>Track <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i></button>
        </form>
        <div className='TrackOutput'></div>
      </section>
    </>
  )
}
