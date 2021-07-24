
import Header from "components/shared/Header"

const BaseLayout = ({children}:{children: React.ReactNode}) => {
    return(
        <>
            <Header/>
            {children}
        </>
    )
}

export default BaseLayout