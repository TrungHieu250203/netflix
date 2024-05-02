import Header from "../components/header-only/header";
import Footer from "../components/footer-only/footer";

// eslint-disable-next-line react/prop-types
const MoviesLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <>
                {children}
            </>
            <Footer />
        </div>
    )
}

export default MoviesLayout;