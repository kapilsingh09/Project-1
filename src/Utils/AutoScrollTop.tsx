import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AutoScrollTop = () => {
    const { pathname } = useLocation(); // current URL path

    useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        })
    }, [pathname])
    
    return null;
}

export default AutoScrollTop
