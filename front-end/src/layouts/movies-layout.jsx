import Header from "../components/header-only/header";
import Footer from "../components/footer-only/footer";
import Ranking from "../components/ranking/ranking";
import Thank from "../components/thank/thank";
import { fetchAllThumbnails } from "../api/index";
import { useEffect, useState } from "react";
import ImageSlider from "../components/slider/slider";

// eslint-disable-next-line react/prop-types
const MoviesLayout = ({ children }) => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
      fetchAllThumbnails()
        .then((response) => {
          const movies = response.map((item) => ({
            thumbUrl: item.movie.thumb_url,
            slug: item.movie.slug,
            name: item.movie.name,
            content: item.movie.content,
            video: item.movie.trailer_url
          }));
          setSlider(movies);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div>
            <Header />
            <ImageSlider images={slider} />
            <>
                {children}
            </>
            <Ranking />
            <Thank />
            <Footer />
        </div>
    )
}

export default MoviesLayout;