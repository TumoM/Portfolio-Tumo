
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Redirect = ({to, ssr}:{to:string, ssr?:any}) => {
    const router = useRouter();

    useEffect((): void => {
        if (ssr) {
            window.location.pathname = to;
        }
        else{
            router.push(to)
        }
    }, )

    return null
}

export default Redirect
