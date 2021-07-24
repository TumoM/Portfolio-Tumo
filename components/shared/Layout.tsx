

import Header from "components/shared/Header"

const Layout = ({children}:{children: React.ReactNode}) => {
    console.log("Children:",children);
    return(
        <>
            <Header/>
            {children}
        </>
    )
}

export default Layout