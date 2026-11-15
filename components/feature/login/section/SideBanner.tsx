import Image from "next/image"
import ITSkrem from "@/public/ITSkrem.svg"


export default function SideBanner() {
    return (
        <section className="w-full h-full bg-accent-800 flex items-center justify-center pt-20">
            <Image src={ITSkrem} alt="ITSkrem" width={400} height={400} />
        </section>
    )
}