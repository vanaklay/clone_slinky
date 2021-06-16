import React from 'react'

const NextSlinky = ({children, goToMenu, setActiveMenu}) => {
    return (
        <li>
            <a className={goToMenu && 'next'} href="#" onClick={() => goToMenu && setActiveMenu(goToMenu)}>
                {children}
            </a>
        </li>
    )
}

export default NextSlinky