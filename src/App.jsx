import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

function App() {
  const createTask = useMutation(api.tasks.post);
  const tasks = useQuery(api.tasks.get);
  const updateTask = useMutation(api.tasks.update);
  const deleteTask = useMutation(api.tasks.remove);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask({ text, isCompleted: false });
    console.log(response);
    setText('');
  };

  const handleUpdate = async (id, isCompleted) => {
    const res = await updateTask({ isCompleted, id });
    console.log(res);
  };

  const handleDelete = async (id) => {
    const res = await deleteTask({ id });
    console.log(res);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form onSubmit={handleSubmit} className="flex flex-row space-x-3">
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {tasks?.map(({ _id, text, isCompleted }) => (
        <div
          key={_id}
          className="flex items-center justify-between space-x-3 my-3  p-3 rounded-lg shadow-md w-full max-w-xs"
        >
          <input
            className="checkbox"
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleUpdate(_id, !isCompleted)}
          />
          <span className={isCompleted ? "line-through" : ""}>{text}</span>
          <button
            className="btn btn-sm"
            onClick={() => handleDelete(_id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
