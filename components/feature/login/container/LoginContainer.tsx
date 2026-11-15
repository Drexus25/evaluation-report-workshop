import LoginSection from "../section/LoginSection";
import SideBanner from "../section/SideBanner";

export default function LoginContainer() {
    return (
        <main className="flex flex-row min-h-screen h-full">
            <div className="flex-1 hidden md:block"><SideBanner/></div>
            <div className="flex-1"><LoginSection/></div>
        </main>
    )
}