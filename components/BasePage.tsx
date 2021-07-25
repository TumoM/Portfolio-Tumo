import React from "react"
import { Container } from "reactstrap"

interface PostProps {
    children: JSX.Element[] | JSX.Element | (string | Element)[];
    className?: string[] | string
  }

const BasePage: React.FC<PostProps> = (props) => {

    const { className = "", children } = props;
    return(
        <div className={`base-page ${className}`}>
            <Container>
                {props.children}
        </Container>
        </div>
    )
}

export default BasePage