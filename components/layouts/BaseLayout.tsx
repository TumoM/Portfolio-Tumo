
import Header from "components/shared/Header"
import { ToastContainer } from 'react-toastify';
const BaseLayout = (props) => {
    const { className, children, user, loading, navClass=" ", isFlipping = false, indexPage } = props;
  const pageType = indexPage ? 'index-page-nav' : 'base-page-nav'
  return (
      <div className="layout-container">
        <Header className={navClass + pageType +` ${isFlipping? "with-bg-orange" : "with-bg-blue"}`} user={user} loading={loading} />
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
