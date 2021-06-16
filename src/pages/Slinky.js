import React, {useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'

import NextSlinky from '../components/next-slinky/NextSlinky'
import TransitionComponent from '../components/transition-component/TransitionComponent'
import {data} from '../data'

const Slinky = () => {
    const [activeMenu, setActiveMenu] = useState('main')
    const levelOne = data.menu.children.map(item => item.link)
    const [levelTwo, setLevelTwo] = useState([])
    const [levelThree, setLevelThree] = useState([])
    const [lastChildren, setLastChildren] = useState([])
    const [lastChildrenMenu, setLastChildrenMenu] = useState('')
    const [lastMenu, setLastMenu] = useState('')
    const [menuHeight, setMenuHeight] = useState(null)
    const [childrenLevel, setChildrenLevel] = useState([])


    function calcHeight(el) {
        const height = el.offsetHeight
        setMenuHeight(height)
    }
    
    useEffect(() => {
        if (data.menu.children.filter(child => child.name === activeMenu)[0]) {
            setChildrenLevel(data.menu.children.filter(child => child.link === activeMenu)[0].children)
            setLevelTwo(data.menu.children.filter(child => child.link === activeMenu)[0].children.map(item => item.link))
            setLastMenu(data.menu.children.filter(child => child.link === activeMenu)[0].link)
        }
    }, [activeMenu])

    useEffect(() => {
        if (levelTwo.includes(activeMenu)) {
            setLevelThree(childrenLevel.filter(child => child.link === activeMenu)[0].children.map(item => item.link))
            setLastChildren(childrenLevel.filter(child => child.link === activeMenu)[0].children)
            setLastChildrenMenu(childrenLevel.filter(child => child.link === activeMenu)[0].link)
        }
    }, [activeMenu, childrenLevel, levelTwo])

    return (
        <section>
            <h2>demo</h2>
            <div className='slinky-menu slinky-theme-default' style={{ height: menuHeight}}>
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={300} classNames="menu-primary" onEnter={calcHeight}>
               <ul id='menu'>
                   <li>
                       <a href="https://designplox.com">
                           <span>designplox</span>
                       </a>
                   </li>
                   {data.menu.children.map(item => {
                       return (
                            <NextSlinky key={item.id} setActiveMenu={setActiveMenu} goToMenu={item.link} ><span>{item.name}</span></NextSlinky>
                       )
                   })}
               </ul>
               </CSSTransition>

            <TransitionComponent 
                level={levelOne} 
                activeMenu={activeMenu} 
                namesClasses='menu-secondary' 
                calcHeight={calcHeight} 
                levelChildren={data.menu.children}
                levelBack='main'
                setActiveMenu={setActiveMenu} />

            <TransitionComponent 
                level={levelTwo} 
                activeMenu={activeMenu} 
                namesClasses='menu-third' 
                calcHeight={calcHeight} 
                levelChildren={childrenLevel}
                levelBack={lastMenu}
                setActiveMenu={setActiveMenu} />

            <TransitionComponent 
                level={levelThree} 
                activeMenu={activeMenu} 
                namesClasses='menu-four' 
                calcHeight={calcHeight} 
                levelChildren={lastChildren}
                levelBack={lastChildrenMenu}
                setActiveMenu={setActiveMenu} />    

            </div>
        </section>
    )
}

export default Slinky