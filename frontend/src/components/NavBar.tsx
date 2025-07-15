import Link from "next/link"
import {Input} from "@heroui/input"


function NavBar() {
    return (
        <header className="shadow shadow-neutral-500 fixed transition-all duration-100 w-full h-12 bg-neutral-200">
            <div className="flex flex-row w-full h-full items-center">
                <div className="ml-auto">
                    <Input 
                        placeholder="Movie"
                        radius="lg"
                        className="ml-[50%] bg-amber-200"
                        type="search"
                    />
                </div>
                <div className="space-x-10 ml-auto text-cyan-600">
                    <Link href="/">Home</Link>
                    <Link href="/movies">Movies</Link>
                    <Link href="/login" className="pr-2">Login</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar
