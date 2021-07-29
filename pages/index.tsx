

import React from 'react';
import BaseLayout from 'components/layouts/BaseLayout'
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';
import Image from "next/image"
import { useUser } from '@auth0/nextjs-auth0';


const roles = ["Developer","Web Development","Back-end Developer","Fullstack Developer","Front-end Developer"]
const Index = () => {
  const { user, error, isLoading } = useUser();

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
      className='cover'
      navClass='nav-dark'
    >
      <div className="main-section">
        <div className="background-image">
          <Image layout="fill" src="/images/background-index.png" alt="Home Background"/>
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper`}>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <Image width="464" height="580" className="image" alt="Avatar by a laptop" src="/images/section-1.png"/>
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  Welcome to the portfolio website of Tumo Masire.
                  Get informed, collaborate and discover projects I have worked on on through the years!
                </h1>
              </div>
              <Typed
                loop
                typeSpeed={70}
                backSpeed={70}
                strings={roles}
                backDelay={1000}
                loopCount={0}
                showCursor
                cursorChar="|"
                className="self-typed"
                />
              <div className="hero-welcome-bio">
                <h1>
                  Let&apos;s take a look on my work.
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  )
}

export default Index
