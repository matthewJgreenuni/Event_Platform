import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";

export default function Header(){
  return(
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between"> 
          <Link className="w-36" href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="Logo"
              width={128} height={128}
            />
          </Link>
          
          {/*Only one of these signed in components will appear based on size of screen*/}
          
          <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs">
              <Navitems />
            </nav>
          </SignedIn>

          <div className="w-32 flex items-center justify-end gap-3">
            {/*Will appear if user is logged in, the user button acts as a profile button*/}
            <SignedIn>
              <UserButton afterSwitchSessionUrl="/" />
              <MobileNav />
            </SignedIn>

            {/*Will appear if user is not logged in */}
            <SignedOut>
              <Button asChild className="rounded-full" size='lg'>
                <Link href='/sign-in'>
                  Login
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>  
      </header>
  )
}

//This code will take you to an official clerk sign up form, to create your own, you must create dynamic sign-in/sign-up pages
//in the auth folder and then tell clerk where to redirect to instead in the ENV file (dynamic is [[...]])