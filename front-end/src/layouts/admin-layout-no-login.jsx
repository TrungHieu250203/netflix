import Header from "../components/header-admin/header-admin";

// eslint-disable-next-line react/prop-types
const AdminLayoutNoLogin = ({ children }) => {
    return (
        <div style={{ backgroundColor: "var(--black-color)" }}>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayoutNoLogin;