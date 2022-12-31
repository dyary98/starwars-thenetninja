import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Planet from "./Planet";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();
const fetchPlanets = async ({ queryKey }) => {
  const [key, page] = queryKey;
  const result = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return result.json();
};

const Planets = () => {
  const [page, setpage] = useState(1);
  const { data, status } = useQuery({
    queryKey: ["planets", page],
    queryFn: ({ queryKey }) => fetchPlanets({ queryKey }),
    // staleTime: 0,
    // cacheTime: 5000,
    // onSuccess: console.log("sucess"),
  });
  console.log("data", data, "status", status);
  return (
    <div>
      <h2>Planets</h2>
      <p>{status}</p>
      {status === "loading" && <h1> Loading ....</h1>}
      {status === "success" && (
        <div>
          <button
            onClick={page > 1 ? () => setpage(page - 1) : () => setpage(page)}
          >
            Previous
          </button>
          <p>{page}</p>
          <button
            onClick={page < 6 ? () => setpage(page + 1) : () => setpage(page)}
          >
            next
          </button>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
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
      <Planets />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
