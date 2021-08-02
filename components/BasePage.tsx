import React from "react"
import { Container } from "reactstrap"
import Head from 'next/head';
import { useRouter } from 'next/router';


interface PostProps {
    children: JSX.Element[] | JSX.Element | (string | Element)[];
    className?: string[] | string,
    header?: string;
    title?:string;
    indexPage?:boolean;
    metaDescription?:string;
    canonicalPath?:string;
    noWrapper?:boolean
  }

const BasePage: React.FC<PostProps> = (props) => {
  const router = useRouter();
  const PageHeader = ({header}) =>
    <div className="page-header">
      <h1 className="page-header-title">{header}</h1>
    </div>

  const {
      className = "",
      indexPage=false,
      children,
      header,
      canonicalPath,
      noWrapper,
      title = "Tumo Masire",
      metaDescription="My name is Tumo Masire and I am an experienced software engineer, web developer, and freelance " +
        "developer. Throughout my career, I have acquired a wide breadth of technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience.",
    } = props;

    const pageType = indexPage ? 'index-page' : 'base-page'
    // @ts-ignore
  // @ts-ignore
  return(
      <>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" key="description" content={metaDescription.substring(0,200)}/>
          <meta name="title" key="title" content={title}/>
          <meta name="charset" key="charset" content={"utf-8"}/>
          <meta property="og:title" key="og:title" content={title} />
          <meta property="og:locale" key="og:locale" content="en_GB"/>
          <meta property="og:locale:alternate" content="en-ZA" />
          <meta property="og:locale:alternate" content="en_EU" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
          <meta property="og:type" key="og:type" content="website" />
          <meta property="og:description" key="og:description" content={metaDescription.substring(0,200)} />
          <meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/section-1.jpg`} />
          <meta property="og:site_name" content="Tumo Masire's Website" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            rel="stylesheet"/>
          <link rel={'icon'} type={'image/x-icon'} href={'/images/favicon.ico'}/>
          <link
            rel="canonical"
            href={`${process.env.BASE_URL}${canonicalPath ? canonicalPath : router.asPath}`}
          />
        </Head>
        <div className={` ${pageType} ${className}`}>
            { noWrapper &&
            <>
              { header && <PageHeader header={header} /> }
              {children}
            </>
            }
            { !noWrapper &&
            <Container>
              { header && <PageHeader header={header} /> }
              {children}
            </Container>
            }
          </div>
      </>
    )
}

export default BasePage
