import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="fixed w-[80%] top-5 left-1/2 -translate-x-1/2 px-10 py-3 bg-[#10704b] flex flex-row justify-between items-center rounded-full border-3 border-[#053322]">
            <div>
                <Link href="/">
                    <h1 className="text-xl font-semibold">Report Evaluation</h1>
                </Link>
            </div>
            <div className="flex flex-row justify-center gap-10">
                <Link href="/login">
                    <button className=" text-[#FFEFB3] border-3 border-[#FFEFB3] text-md font-bold px-8 py-2 rounded-full cursor-pointer hover:bg-[#FFEFB3] hover:text-[#10704b] transition-all duration-300">Login</button>
                </Link>
            </div>
        </nav>
    )
} 