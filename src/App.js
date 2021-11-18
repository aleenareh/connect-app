import './App.css';
import React, {useState, useEffect} from "react"; 
import Axios from 'axios'; 

function App() {
  // const [researcherType, setResearcherType] = useState(''); 
  // const [department, setDepartment] = useState(''); 
  // const [firstName, setFirstName] = useState(''); 
  // const [lastName, setLastName] = useState(''); 
  // const [email, setEmail] = useState(''); 
  const [researcherId, setResearcherId] = useState(''); 
  const [interests, setInterests] = useState(''); 
  const [projectId, setProjectId] = useState(''); 
  const [projectType, setProjectType] = useState('');
  const [result, setResult] = useState([]); 
  const [result2, setResult2] = useState([]); 
  const [result3, setResult3] = useState([]); 

  
  // hash function to create new Researcher_ID: 
  // in python: Researcher_ID = hash(FirstName + "" + Last_Name)
  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/get')
  // })
  
  // 1. submit a new project
  const submitProject = () => {
    console.log("we made it here!"); 
    Axios.post('http://localhost:3002/api/insert', {
      projectId:projectId, 
      projectType:projectType
    }).then(() => {
      alert('insertion!')
    })
  };

  // 2. search our database using keyword
  const searchDatabase= (interests) => {
    Axios.get(`http://localhost:3002/api/${interests}`, {
    }).then((response) => {
      setResult(response.data); 
      console.log(interests); 
      // console.log(response.data);
    })
  }; 

  // 3. Update records on the database
  const updateResearcher = () => {
    Axios.put('http://localhost:3002/api/update', {
      interests:interests, 
      researcherId:researcherId
    }).then(() => {
      alert('update!'); 
    })
  }

  // 4. delete an existing project
  const deleteProject = (projectType) => {
    console.log("deleting"); 
    Axios.delete(`http://localhost:3002/api/delete/${projectType}`, {
    }).then(() => {
      alert('deletion!')
    })
  };

  // 5. advanced sql queries 
  // NOTE: SHOULD I BE USING USE EFFECT HERE? 
  const findSeniorsAndGrad = () => {
    Axios.get('http://localhost:3002/api/get/senior-grad', {
    }).then((response) => {
      alert('successful get seniors and grad info');
      console.log(response.data); 
      setResult2(response.data); 
      // ADD DIV HERE TO RETURN THE RESULTS
    })
  };

  const findAIResearcher = () => {
    Axios.get('http://localhost:3002/api/get/ai-research', {
    }).then((response) => {
      alert('successful get ai researcher info'); 
      setResult3(response.data); 
    })
  };

  return (
    <div className="App">
      <h1> Research Connect </h1>
      <div className="find-buttons">
      <div className="seniors-and-grads">
        <button class="find_button" onClick={findSeniorsAndGrad}> Find undergrad seniors and experienced grad students </button>
      </div>
      <div className="ai-and-ai">
        <button class="ai_button"onClick={findAIResearcher}> Find researchers who are really into artificial intelligence </button>
      </div>
      </div>
      <div className="insert-form">
        <h2> Submit New Project </h2>
        <label className="project-id"> Project Id: </label>
        <input type="text" name="projectId" onChange={(e) => {
          setProjectId(e.target.value)
        }}/>
        <label> Project Type: </label>
        <input type="text" name="projectType" onChange={(e) => {
          setProjectType(e.target.value)
        }}/>
      </div>
      <button class="set-project" onClick={submitProject}>Submit Project</button>


      <div className="search-form">
        <h2> Search for Researchers with a Specific Interest </h2>
        <label> Interest: </label>
        <input type="text" name="interests" onChange={(e) => {
          setInterests(e.target.value)
        }}/>
        <button onClick={() => searchDatabase(interests)}>Search</button>
      </div>

      <div className="update-form">
        <h2> Update Researcher Interest </h2>
        <label> Researcher Id: </label>
        <input type="text" name="researcher" onChange={(e) => {
          setResearcherId(e.target.value)
        }}/>
        <label> New Interest: </label>
        <input type="text" name="interests" onChange={(e) => {
          setInterests(e.target.value)
        }}/>
        <button onClick={updateResearcher}>Update Research Interests</button>
      </div> 

      <div className="delete-form">
        <h2> Delete Existing Project Type </h2>
        <label> Project Type: </label>
        <input type="text" name="project" onChange={(e) => {
          setProjectType(e.target.value)
        }}/>
        <button onClick={() => deleteProject(projectType)}>Delete Project</button>
      </div>

       

      {result.map((val) => {
      return (
        <div className="results">
          <h2>{val.First_Name} {val.Last_Name}, Email: {val.Email} Department: {val.Department} </h2>
        </div>
      );
    })}

      {result2.map((val) => {
      return (
        <div className="results">
          <h2>Count: {val.freq} Year: {val.student_year} {val.grad_year} </h2>
        </div>
      );
    })}

{result3.map((val) => {
      return (
        <div className="results">
          <h2>Name: {val.First_Name} {val.Last_Name} </h2>
        </div>
      );
    })}
    </div>
  );
}

export default App;
