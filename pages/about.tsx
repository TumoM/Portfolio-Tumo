
import BaseLayout from 'components/layouts/BaseLayout'
import React, {useEffect} from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import {Col, Row} from 'reactstrap';

declare global {
  interface Window {
    __isAboutLoaded:boolean;
  }
}
const About = () =>  {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    return () => {
      // @ts-ignore
      window.__isAboutLoaded = true
    }
  })

  const createFadeInClass = (tag = "fadein") => {
    if (typeof window !== 'undefined'){
      return window.__isAboutLoaded ? '' : tag
    }
    return 'fadein'
  }
  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage
        className={'about-page'}
        title="About Me - Tumo Masire"
      >
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>To The About Me Page</h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>Feel free to read the short description about me.</p>
            </div>
          </Col>
          <Col md="6">
            <div className={` ${createFadeInClass("fadein-delay")}`}>
              <p>My name is Tumo Masire and I am a software engineer, web developer, and Computer Vision enthusiast. </p>
              <p>
                I have a Bachelor&apos;s degree in Economics and Computer Science, in addition to multiple online courses completed
                and several years of experience working on a wide range of technologies and projects from web applications in React and Express,
                Electron, Ionic, Python Web Scrapers and Automation tools, and Java FX Applications.
              </p>
              <p>
                Throughout my career, I have strived to acquire advanced technical knowledge and the ability to explain
                programming topics clearly and in detail to a broad audience. I am always learning and improving my skills,
                and welcome any new challenge as an opportunity for growth
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default About
