import "./LoginPage.css"
function LoginPage() {
    const backendPort = process.env.REACT_APP_PORT;
    const submitApi = `http://localhost:${backendPort}/submit`;
    
    return (
      <>
        <img src="EduSphereLogo.png" alt="" />
        <form action="http://localhost:3000/submit" method="GET">
          <label htmlFor="id-inp">Please Provide your ID Number.</label>
          <input type="text" name="id" id="id-inp" />
  
          <label htmlFor="semel-inp">Please write your school Semel:</label>
          <input type="text" name="semel" id="semel-inp" />
  
          <label htmlFor="class-inp">Please write your class:</label>
          <input type="text" name="class" id="class-inp" />
  
          <label htmlFor="password-inp">Please write your Mashov password:</label>
          <input type="password" name="password" id="password-inp" />
  
          <button>Submit</button>
        </form>
      </>
    );
  }
  export default LoginPage;
  