import "./HorizontalNavbar.css"
function HorizontalNavbar(props={}){
    const tags = props.tags;
    // Takes every key+value and outputs in <a> format
    const items = Object.entries(tags).map(([tag,link]) =>
        <a href={link}>{tag}</a>
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