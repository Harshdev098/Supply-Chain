import React from 'react'

export default function Verify() {
    return (
        <>
            <nav className='mainNav'>
                <div>
                    <h1>ChainX</h1>
                </div>
                <div>
                    <ul>
                        <li><button style={{ fontSize: "19px", padding: '10px', margin: '4px' }}>Connect Metamask</button></li>
                    </ul>
                </div>
            </nav>
            <div className='verifyContainer'>
                <div className='verifyFirst'>
                    <form>
                        <labe>Upload the QR image of the product</labe>
                        <input type="file" required />
                        <button>Verify</button>
                    </form>
                </div>
                <div>
                    Or
                </div>
                <div className='verifySecond'>
                    <form>
                        <labe>Scan the QR Code</labe>
                        <input type="file" required />
                        <button>Verify</button>
                    </form>
                </div>
            </div>
        </>
    )
}
