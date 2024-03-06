import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

function App() {
  const createTask = useMutation(api.tasks.post)
  const tasks = useQuery(api.tasks.get);
  const [text, setText] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const handleSubmit = async()=> {
    const response = await createTask({text, isCompleted})
    console.log(response)
  }
  return (
    <div className="App">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
      <div>
        <form method="POST" onSubmit={handleSubmit}>
          <input type="text" name="text" id="text" onChange={(e)=>setText(e.target.value)} />
          <input type="checkbox" name="IsCompleted" id="IsCompleted" checked={isCompleted} onChange={()=>setIsCompleted(!isCompleted)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;