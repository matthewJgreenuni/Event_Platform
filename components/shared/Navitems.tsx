"use client"

//use client needs to be used if hooks are used

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navitems(){
    const pathname = usePathname();

    //if the pathname variable which takes the current path the user is on is equal to the path held in the link object, give it extra styling
    //this is very common, learn it
    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
            {headerLinks.map((link) => {
                const isActive = pathname === link.route;
                return(
                    <li key={link.route} className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}>
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}