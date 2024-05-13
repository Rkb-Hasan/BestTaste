import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import TopFoods from "./TopFoods/TopFoods";
import Opinion from "./Opinion/Opinion";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <TopFoods></TopFoods>
      <Reviews></Reviews>
      <Opinion></Opinion>
    </div>
  );
};

export default Home;
