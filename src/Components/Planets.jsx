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
// there are some important stuf here
// 1 usepaginatedQuery
// 2 using max and min
// 3 using disabled:

// import React, { useState } from 'react';
// import { usePaginatedQuery } from 'react-query';
// import Planet from './Planet';

// const fetchPlanets = async (key, page) => {
//   const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
//   return res.json();
// }

// const Planets = () => {
//   const [ page, setPage ] = useState(1);
//   const {
//     resolvedData,
//     latestData,
//     status
//   } = usePaginatedQuery(['planets', page], fetchPlanets);

//   return (
//     <div>
//       <h2>Planets</h2>

//       {status === 'loading' && (
//         <div>Loading data</div>
//       )}

//       {status === 'error' && (
//         <div>Error fetching data</div>
//       )}

//       {status === 'success' && (
//         <>
//           <button
//             onClick={() => setPage(old => Math.max(old - 1, 1))}
//             disabled={page === 1}>
//             Previous Page
//           </button>
//           <span>{ page }</span>
//           <button
//             onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
//             disabled={!latestData || !latestData.next}>
//             Next page
//           </button>
//           <div>
//             { resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Planets;
export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <Planets />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
