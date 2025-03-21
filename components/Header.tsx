"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/app/store/store";


const Header = () => {

    const {user} = useUser();
    const itemCount = useBasketStore((state)=>
    state.items.reduce((total, item)=>total + item.quantity, 0)
);

  return (
    <header className="flex flex-wrap justify-bettween items-center px-4 py-2">

        <div className="flex w-full flex-wrap justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-300 
            hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
            Pinaccle Fashion</Link>

        <Form action='/search' className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
            <input type="text" name="query" placeholder="Search for product" 
            className="bg-gray-100 
            text-gray-600 px-4 py-2 
            rounded focus:outline-none 
            focus:ring-2 
            focus:ring-blue-50 
            focus:ring-opacity-50 
            border w-full max-w-fll"/>
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            <Link href="/basket" 
            className="flex-1 relative flex 
            justify-center sm:justify-start
            sm:flex-none items-center space-x-2 
            bg-blue-500 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded
            
            ">
            <TrolleyIcon className="w-6 h-6"/>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full
            w-5 h-5 flex items-center justify-center text-xs">{itemCount}</span>
            <span>Cart</span>
            </Link>

            {/* User Area*/}
            <ClerkLoaded>
                <SignedIn>
                    <Link href="/orders" className="flex-1 relative flex 
                    justify-center sm:justify-start
                    sm:flex-none items-center space-x-2 
                    bg-blue-500 hover:bg-blue-700
                    text-white font-bold py-2 px-4 rounded
                    
                    ">
                        <PackageIcon className="w-6 h-6"/>
                        <span>My Orders</span>
                    </Link>
                </SignedIn>
                
                {user ? (
                    <div className="flex items-center space-x-2 ">
                        <UserButton />
                        <div className="hidden sm:block text-xs">
                            <p className="text-gray-400">Welcome back</p>
                            <p className="font-bold">{user.fullName}!</p>
                        </div>
                    </div>
                ):(
                    <SignInButton mode="modal"/>
                )}      
                 {/*{user?.passkeys.length === 0 && (
                    <button onClick={createClerkPassKey}
                    className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white animate-pulse font-bold 
                    py-2 px-4 rounded border-r-blue-300 border">
                        Create Passkey
                    </button>
                )}*/}          
                
            </ClerkLoaded>
        </div>
        </div>
        </header>
  )


}

export default Header