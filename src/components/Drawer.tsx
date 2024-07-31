import { useState, useCallback, type ReactNode, useRef, useEffect } from "react";

export interface DrawerProps {
    title: string;
    children: ReactNode;
}

export default function Drawer({ title, children }: DrawerProps) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleOpen = useCallback(() => {
        setOpen(prevOpen => !prevOpen);
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleTouchStart = () => {
            button.classList.add('active-tap');
        };

        const handleTouchEnd = () => {
            button.classList.remove('active-tap');
        };

        button.addEventListener('touchstart', handleTouchStart);
        button.addEventListener('touchend', handleTouchEnd);

        return () => {
            button.removeEventListener('touchstart', handleTouchStart);
            button.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <section className="">
            <button
                ref={buttonRef}
                className={`
                    p-4 text-pretty rounded-lg w-full font-mono
                    bg-slate-200 text-black
                    hover:bg-black hover:text-white 
                    dark:hover:bg-slate-500
                    tracking-tight transition-colors duration-300 ease-in-out
                    ${open ? 'drawer-open bg-black text-white dark:bg-slate-500' : ''}
                `}
                onClick={toggleOpen}
                aria-expanded={open}
            >
                <h2 className="flex justify-between text-left">
                    {title}
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </h2>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="prose dark:text-white p-2">
                    {children}
                </div>
            </div>
        </section>
    )
}