import Footer from "../components/footer/footer";

// eslint-disable-next-line react/prop-types
const LoginLayout = ({ children }) => {
    return (
        <>
            <>
                { children }
            </>
            <Footer />
        </>
    );
}

export default LoginLayout;