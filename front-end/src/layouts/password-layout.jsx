import Header from "../components/header-forgot-page/header";
import Footer from "../components/footer-only/footer";


// eslint-disable-next-line react/prop-types
const ForgotPasswordLayout = ({ children }) => {
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

export default ForgotPasswordLayout;