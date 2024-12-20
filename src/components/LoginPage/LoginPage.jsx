import "./LoginPage.css"
function LoginPage(){
    return (
        <>
            <img src="EduSphereLogo.png" alt=""/>
            <form action="GET">
                <label htmlFor="id-inp">Please Provide your ID Number.</label> 
                <input type="text" name="" id="id-inp"/>

                <label htmlFor="semel-inp">Please write you school Semel:</label>
                <input type="text" name="" id="semel-inp"/>

                <label htmlFor="class-inp">Please write your class:</label>
                <input type="text" name="" id="class-inp"/>

                <label htmlFor="password-inp">Please wirite your mashov password:</label>
                <input type="password" name="" id="password-inp" />

                <button>Submit</button>
            </form>
        </>
    )
}
export default LoginPage