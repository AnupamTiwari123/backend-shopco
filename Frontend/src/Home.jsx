import Banner from './Components/Banner/Banner';
import NewCollection from './Components/NewCollection/NewCollection';
import Newsletter from './Components/NewsLetter/NewsLetter';


function Home() {
  return (
    <div className="home-container">
      <Banner />
      <NewCollection />
      <Newsletter/>
    </div>
  );
}

export default Home;
