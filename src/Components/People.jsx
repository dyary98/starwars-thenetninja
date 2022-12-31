import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Person from "./Person";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const fetchPeople = async () => {
  const result = await fetch("https://swapi.dev/api/people/");
  return result.json();
};

const People = () => {
  const { data, status } = useQuery(["people"], fetchPeople);
  console.log("data", data, "status", status);
  return (
    <div>
      <h2>People</h2>
      <p>{status}</p>
      {status === "loading" && <h1> Loading ....</h1>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
      {status === "error" && <h1> Error Fetching Data</h1>};
    </div>
  );
};

export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <People />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
