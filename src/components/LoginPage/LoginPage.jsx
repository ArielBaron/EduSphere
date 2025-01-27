import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate(); // Hook to handle navigation
  const [id, setId] = useState("");
  const [semel, setSemel] = useState("");
  const [password, setPassword] = useState("");
  const [userClass, setUserClass] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const inputs = JSON.parse(e.target.result);
        setId(inputs["ID"]);
        setSemel(inputs["SEMEL"]);
        setPassword(inputs["PASSWORD"]);
        setUserClass(inputs["CLASS"]);
      };
      reader.readAsText(file); // Adjust based on file type
    } else {
      console.log("No file selected");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Create an object with the form data
    const loginData = {
      id,
      semel,
      userClass,
      password,
    };
  
    // Send a POST request to the backend with the form data in the request body
    fetch(`http://localhost:${3000}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate that the request body is JSON
      },
      body: JSON.stringify(loginData), // Send the form data as JSON in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (e.g., navigate to /personal with the data)
        console.log("Received data:", data);
        navigate("/personal", { state: data }); // Pass data to the /personal route
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <>
      <img src="EduSphereLogo.png" alt="EduSphere Logo" />
      <input
        type="file"
        name="AutoCompleteFile"
        onChange={handleFileChange}
        id="auto-complete-inp"
        accept=".txt, .json"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="id-inp">Please Provide your ID Number.</label>
        <input
          type="text"
          name="id"
          id="id-inp"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label htmlFor="semel-inp">Please write your school Semel:</label>
        <input
          type="text"
          name="semel"
          id="semel-inp"
          value={semel}
          onChange={(e) => setSemel(e.target.value)}
        />

        <label htmlFor="class-inp">Please write your class:</label>
        <input
          type="text"
          name="userClass"
          id="class-inp"
          value={userClass}
          onChange={(e) => setUserClass(e.target.value)}
        />

        <label htmlFor="password-inp">Please write your Mashov password:</label>
        <input
          type="password"
          name="password"
          id="password-inp"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginPage;
