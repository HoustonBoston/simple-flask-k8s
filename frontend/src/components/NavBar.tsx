import Link from "next/link"


function NavBar() {
    return (
        <header className="shadow shadow-neutral-500 fixed top-0 transition-all duration-100 w-full h-12 bg-neutral-200">
            <div className="flex flex-row justify-end w-full h-full pr-2 items-center space-x-10">
                <Link href="/movies">Movies</Link>
                <Link href="/login" className="pr-2">Login</Link>
            </div>
        </header>
    )
}

export default NavBar
