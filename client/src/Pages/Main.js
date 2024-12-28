import React from 'react';
import Navbar from '../Components/Navbar';
import KnowManufacturer from '../Components/KnowManufacturer';
import Track from '../Components/Track';

export default function Main() {
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="leftContent">
          <div>
            <h3>ksdlflskd</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div>
            <h3>ksdlflskd</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div>
            <h3>ksdlflskd</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div>
            <h3>ksdlflskd</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
        </div>
        <div className="rightContent">
          <h3 className="statsHeading">Your Stats</h3>
          <div className="statBoxes">
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div><div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div><div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
          </div>
        </div>
      </main>
      <main style={{backgroundColor:'#e0e0f0'}}>
      <KnowManufacturer />
      <Track />
      </main>
    </>
  );
}
