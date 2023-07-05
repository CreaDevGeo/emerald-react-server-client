import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [creatureList, setCreatureList] = useState([
    { name: "Unicorn", origin: "Britain" },
    { name: "Sphinx", origin: "Egypt" },
    { name: "Jackalope", origin: "America" },
  ]);

  const [creatureNameInput, setCreatureNameInput] = useState('');
  const [creatureOriginInput, setCreatureOriginInput] = useState('');


  const fetchCreatures = () => {
    /*  Alternative syntax for Axios call:
  axios.get('/creature')
  .then(...)
   */

    axios({
      method: "GET",
      url: "/creature",
    })
      .then((response) => {
        // Response.data is where the server response data we care about is
        console.log("Response is:", response.data);
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log("Error with fetch creatures:", error);
        alert("Error fetching creatures.");
      });
  };

  // Hook into the React life cycle and run fetchCreatures when this component loads
  // React equivalent to JQuery's onReady function
  useEffect(() => {
    fetchCreatures();
  }, []);
  // 👆The empty array is saying that this should only run once when component loads

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Creature submitted!");

    axios({
      method: "POST",
      url: "/creature",
      data: {
        name: creatureNameInput,
        origin: creatureOriginInput
      },
    }).then((response) => {
      console.log("Creature sent! Response is:", response);
      fetchCreatures();
      setCreatureNameInput("");
      setCreatureOriginInput("");
    }).catch((error) => {
      console.log("Error with POST creature", error);
      alert("Error with adding creature!");
    })
  }

  return (
    <div>
      <form>
        <input placeholder="Creature name" onChange={(event) => setCreatureNameInput(event.target.value)} value={creatureNameInput} />
        <input placeholder="Creature origin" onChange={(event) => setCreatureOriginInput(event.target.value)} value={creatureOriginInput} />
        <button onClick={handleSubmit} >Add New Creature</button>
      </form>


      <ul>
        {creatureList.map((creature) => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
