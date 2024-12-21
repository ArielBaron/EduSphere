import "./HorizontalNavbar.css"
import { Link } from "react-router-dom";

function HorizontalNavbar(props={}){
    const tags = props.tags;
    // Takes every key+value and outputs in <Link> format to go to localhost::3000/link
    const items = Object.entries(tags).map(([tag,link]) =>
        <Link key={tag} to={link}>{tag}</Link>
    );

    return(
        <>
            <nav>
                {items}
            </nav>
        </>
    )
}
export default HorizontalNavbar;
