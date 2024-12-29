import "./LoginPage.css"
function LoginPage() {
    const backendPort = process.env.REACT_APP_PORT;
    const submitApi = `http://localhost:${backendPort}/submit`;
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const inputs = JSON.parse(e.target.result)[0];
          console.log(inputs);
          for(const inputName of Object.keys(inputs)){
            console.log(inputName);
          }
          document.getElementById("id-inp").value = inputs["ID"];
          document.getElementById("semel-inp").value = inputs["SEMEL"];
          document.getElementById("password-inp").value = inputs["PASSWORD"];
          document.getElementById("class-inp").value = inputs["CLASS"]
        };
        reader.readAsText(file); // Adjust based on file type
      } else {
        console.log("No file selected");
      }
    };
    return (
      <>
        <img src="EduSphereLogo.png" alt="" />
        <input type="file" name="AutoCompleteFile" onChange={handleFileChange} id="auto-complete-inp" accept=".txt, .json" ></input>
        <form action={`http://localhost:3000/submit`} method="GET">
          <label htmlFor="id-inp">Please Provide your ID Number.</label>
          <input type="text" name="id" id="id-inp" />
  
          <label htmlFor="semel-inp">Please write your school Semel:</label>
          <input type="text" name="semel" id="semel-inp" />
  
          <label htmlFor="class-inp">Please write your class:</label>
          <input type="text" name="userClass" id="class-inp" />
  
          <label htmlFor="password-inp">Please write your Mashov password:</label>
          <input type="password" name="password" id="password-inp" />
  
          <button>Submit</button>
        </form>
      </>
    );
  }
  export default LoginPage;
  