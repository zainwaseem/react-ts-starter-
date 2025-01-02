import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./types";

const fetchTodos = async () => {
  try {
    const data = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Postss = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  console.log(data);
  return (
    <div>
      {data?.data?.slice(0, 5).map((todo: Todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>User ID: {todo.userId}</p>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default Postss;
