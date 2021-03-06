

import React, {useEffect, useRef, useState} from 'react';
import BaseLayout from 'components/layouts/BaseLayout'
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';
import Image from "next/image"
import { useUser } from '@auth0/nextjs-auth0';
import BasePage from "../components/BasePage";


const roles = ["Developer","Web Development","Back-end Developer","Fullstack Developer","Front-end Developer"]
const Index = () => {
  const { user, error, isLoading } = useUser();
  const [isFlipping, setIsFlipping ] = useState(false)
  const flipInterval = useRef();
  console.log("Vercel URL:",process?.env?.VERCEL_URL||null)
  useEffect(() => {
    startAnimation()
    return () => {
      if (flipInterval.current) clearInterval(flipInterval.current)
    };
  }, []);


  const startAnimation = () => {
    // @ts-ignore
    flipInterval.current = setInterval(() => {
      setIsFlipping((prev) => !prev)
    }, 20000);
  }

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
      className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}
      transparent
      indexPage
      isFlipping={isFlipping}
    >
      <div className="main-section">
        <div className="background-image">
          <Image layout="fill" src="/images/background-index.png" alt="Home Background"/>
        </div>
        <BasePage
          title={'Home Page - Tumo Masire'}
          indexPage
        >
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my work and job history.
                        </div>
                      </div>
                      <Image width="464" height="580" className="image" alt="Avatar by a laptop" src="/images/section-1.jpg"/>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my work and job history.
                        </div>
                      </div>
                      <Image width="464" height="580" className="image" alt="Avatar by a laptop" src="/images/section-2.jpg"/>
                      <div className="shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="5" className="ml-2 hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the work website of Tumo Masire.
                    Get informed, collaborate and discover portfolios I have worked on on through the years!
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
        </BasePage>
      </div>
    </BaseLayout>
  )
}

export default Index
