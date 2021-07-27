import React from "react"
import { Container } from "reactstrap"

interface PostProps {
    children: JSX.Element[] | JSX.Element | (string | Element)[];
    className?: string[] | string,
    header?: string
  }

const BasePage: React.FC<PostProps> = (props) => {

    const { className = "", children, header } = props;
    return(
        <div className={`base-page ${className}`}>
            <Container>
                {
                    header && 
                    <div className="page-header text-center">
                        <h1 className='page-header-title'>{header}</h1>
                    </div>
                }
                {children}
            </Container>
        </div>
    )
}

export default BasePage