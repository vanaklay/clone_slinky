import React from 'react'
import {CSSTransition} from 'react-transition-group'

import NextSlinky from '../next-slinky/NextSlinky'

const TransitionComponent = ({level, activeMenu, namesClasses, calcHeight, levelChildren, levelBack, setActiveMenu}) => {
    return (
        <CSSTransition 
            in={level.includes(activeMenu)} 
            unmountOnExit 
            timeout={300} 
            classNames={namesClasses}
            onEnter={calcHeight}
            >
            <ul id='menu'>
                    <li>
                        <a className='back' href="#" onClick={() => setActiveMenu(levelBack)} >
                        </a>
                    </li>
                    { levelChildren.filter(child => child.link === activeMenu)[0] 
                        && levelChildren.filter(child => child.link === activeMenu)[0]
                            .children.map(item => {
                                return (
                                    <NextSlinky key={item.id} setActiveMenu={setActiveMenu} goToMenu={item.link} ><span>{item.name}</span></NextSlinky>
                                )
                            })
                    }
            </ul>
        </CSSTransition>
    )
}

export default TransitionComponent