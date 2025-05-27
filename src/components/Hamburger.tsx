import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";

interface BurgerProps {
  state: boolean;
  setState: (newState: boolean) => void;
}

export function Burger({ setState, state }: BurgerProps) {
  return (
    <button
      className="hover:cursor-pointer hover:text-slate-500"
      onClick={() => setState(!state)}
    >
      <GiHamburgerMenu className="text-2xl" />
    </button>
  );
}

interface ButtonProps {
  state: boolean;
  setState: (newState: boolean) => void;
}

export function Close({ setState, state }: ButtonProps) {
  return (
    <button
      onClick={() => setState(!state)}
      className="hover:text-slate-200 inline-block w-fit justify-end"
    >
      <IoMdCloseCircle className="text-2xl" />
    </button>
  );
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
      string: "Newsletter",
      url: "https://newsletter.adamkoszary.co.uk/subscribe",
    },
    {
      id: 1,
      string: "Posts",
      url: "/#posts",
    },
    {
      id: 2,
      string: "Contact",
      url: "/#contact",
    },
  ];
  return (
    <div className="flex items-start gap-y-4 gap-x-2 z-10">
      <ul className="flex flex-col gap-6 mt-2 items-end">
        {ListItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              title={item.string}
              className="md:text-xl text-sm rounded-lg px-6 py-2 tracking-tight transition-colors duration-300 font-mono bg-slate-200 text-black hover:bg-black hover:text-white dark:hover:bg-slate-500"
            >
              {item.string}
            </a>
          </li>
        ))}
      </ul>
      <Close state={state} setState={setState} />
    </div>
  );
}

export default function Menu() {
  const [expand, setExpand] = useState(false);
  return (
    <nav className="flex">
      {expand ? (
        <List state={expand} setState={setExpand} />
      ) : (
        <Burger state={expand} setState={setExpand} />
      )}
    </nav>
  );
}
