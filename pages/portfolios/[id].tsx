
import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'


interface Portfolio {
  body: string;
  id: number;
  title: string;
  userId: number;
}
interface Query {
  id: number|string;
}


const PortfolioDetail = ({portfolio} : {portfolio: Portfolio}):JSX.Element => {
    const router = useRouter();

    return (
        <BaseLayout>
          <BasePage>
            <h1>{portfolio.title}</h1>
            <p>BODY: {portfolio.body}</p>
            <p>ID: {portfolio.id}</p>
          </BasePage>
        </BaseLayout>
    )
}

PortfolioDetail.getInitialProps = async ({query}:{query:Query}): Promise<object> => {
    console.log("In initial state");
    let post = {};
  
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+query?.id)
      post = response.data
      console.log("Response:",response);
      console.log("Post:",post);
    }
    catch(e) {
      console.log(e);
      
    }
  
    return {portfolio:post};
  }
export default PortfolioDetail