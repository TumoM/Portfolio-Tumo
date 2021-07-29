
import Header from "components/shared/Header"
import { ToastContainer } from 'react-toastify';
const BaseLayout = (props) => {
    const { className, children, user, loading, navClass="with-bg" } = props;
    return (
      <div className="layout-container">
        <Header className={navClass} user={user} loading={loading} />
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
          <ToastContainer />
      </div>
    )
  }

export default BaseLayout
