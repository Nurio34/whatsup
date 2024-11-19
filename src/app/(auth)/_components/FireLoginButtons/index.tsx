import Github from "./_components/Github";
import Google from "./_components/Google";
import Twitter from "./_components/Twitter";

function FireLoginButtons() {
    return (
        <div className=" space-y-[1vh]">
            <Google />
            <Github />
            <Twitter />
        </div>
    );
}

export default FireLoginButtons;
