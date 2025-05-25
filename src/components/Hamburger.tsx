import burger from '../images/burger.svg'
import burgerWhite from '../images/burger-white.svg'
import close from '../images/close.svg'
import closeWhite from '../images/close-white.svg'
import { useState } from 'react'

interface BurgerProps {
    state: boolean;
    setState: (newState: boolean) => void;
}

export function Burger({ setState, state }: BurgerProps) {
    return (
        <button className='cursor-pointer' onClick={() => setState(!state)}>
            <img className='dark:hidden h-10' src={burger.src} />
            <img className='not-dark:hidden h-10' src={burgerWhite.src} />
        </button>
    )
}

interface ButtonProps {
    state: boolean;
    setState: (newState: boolean) => void;
}

export function Close({ setState, state }: ButtonProps) {
    return (
        <button onClick={() => setState(!state)}>
            <img className='dark:hidden h-8' src={close.src} />
            <img className='not-dark:hidden h-8' src={closeWhite.src} />
        </button>
    )
}

/** List item props */
interface ListItem {
    id: number;
    string: string;
    url: string;
}

export function List({ state, setState }: ButtonProps) {
    const ListItems: ListItem[] = [
        {
            id: 0,
            string: 'Newsletter',
            url: 'https://content-of-the-week.beehiiv.com/subscribe',
        },
        {
            id: 1,
            string: 'Posts',
            url: '/#posts',
        },
        {
            id: 2,
            string: 'Contact',
            url: '/#contact',
        },
    ]
    return (
        <ul className='flex flex-col items-end gap-8 pt-8'>
            {ListItems.map((item) =>
                <li key={item.id} >
                    <a href={item.url} title={item.string}
                        className='text-xl rounded-lg px-8 py-4 tracking-tight transition-colors duration-300 font-mono bg-slate-200 text-black hover:bg-black hover:text-white dark:hover:bg-slate-500'>
                        {item.string}
                    </a>

                </li >
            )
            }
            <li><Close state={state} setState={setState} />
            </li>
        </ul >
    )
}

export default function Menu() {
    const [expand, setExpand] = useState(false)
    return (
        <nav className={`md:hidden flex z-10 self-end`}>
            {expand ? <List state={expand} setState={setExpand} /> : <Burger state={expand} setState={setExpand} />}
        </nav>
    )
}