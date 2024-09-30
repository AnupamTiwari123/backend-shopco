import './Banner.css'
import bannerImage from '../../assets/bannerimage1.png'
import { Link } from 'react-router-dom'
function Banner() {
    return (
        <>
            <div className='banner'>

                <div className='banner-content'>
                    <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                    <p>Browse through our diverse range of meticulously crafted garments,designed to bring</p>
                    <div className='button'>

                        <Link to={"/products"}><button>Shop Now</button></Link>
                    </div>
                    <div className='Highlights'>
                        <div className='Highlight1'>
                            <h3> 200+ </h3>
                            <p>International Brands</p>
                        </div>
                        <div className='highlight2'>
                            <h3> 2,000+ </h3>
                            <p>High-Quality Products</p>

                        </div>
                        <div className='highlight3'>
                            <h3> 30,000+ </h3>
                            <p>Happy Customers</p>

                        </div>
                    </div>

                </div>
                <div className='banner-image'>
                    <img src={bannerImage} alt="" height="100%" width="100%" />
                </div>
            </div>
            <div className='banner-line'>
                <h1>VERSACE</h1>
                <h1>ZARA</h1>
                <h1>GUCCI</h1>
                <h1>PRADA</h1>
                <h1>Calvin Klein</h1>
            </div>
        </>
    )
}

export default Banner