import Link from "next/link"
import { Input } from "@chakra-ui/input"

function NavBar() {
    return (
        <header className="shadow shadow-neutral-500 fixed duration-100 w-full h-12 bg-red-200">
            <div className="flex justify-between flex-row w-full h-full items-center">
                <div className="ml-[50%] -translate-x-1/2">
                    <Input
                        className="focus:outline-none bg-amber-50 rounded-2xl placeholder:text-center placeholder:cursor-auto
                        text-center"
                        placeholder="Search movie"
                        variant="flushed"
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
