import Link from "next/link"
import {Input} from "@heroui/input"


function NavBar() {
    return (
        <header className="shadow shadow-neutral-500 fixed duration-100 w-full h-12 bg-red-200">
            <div className="flex justify-between flex-row w-full h-full items-center">
                <div className="ml-[50%] -translate-x-1/2">
                    <Input 
                        placeholder="Search movie"
                        className="bg-amber-200 rounded-lg"
                        type="search"
                        isClearable
                    />
                </div>
                <div className="space-x-6 text-cyan-600">
                    <Link href="/">Home</Link>
                    <Link href="/movies">Movies</Link>
                    <Link href="/login" className="pr-2">Login</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar
