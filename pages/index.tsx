import Link from "next/link";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {fetchInfiniteData, PaginatedData} from "../service";
import {QUERY_KEY, useInfiniteDataQuery} from "../hooks/useInfiniteData";

export default function Home() {

  const {data, fetchNextPage} = useInfiniteDataQuery()
  const flattened =  data?.pages.map((group) => group.items).flat(1) || []

  return (
    <div>
      <h1>Prefetch Rehydration Issue</h1>
      <hr/>
      <ol>
        <li>Click <strong>Fetch More</strong> a few times.</li>
        <li>Click <strong>Page 1 (Non-Shallow)</strong> link.</li>
        <li>Once on <strong>Page 1</strong>, use the browser&apos;s back button, or click <strong>Home</strong> to route back here.</li>
        <li>Note the prefetched query cache has been cleared.</li>
        <li>Repeat the same steps for <strong>Page 2 (Shallow)</strong></li>
      </ol>
      <hr />
      <div>
        <h3>
          <Link href="/page_1">Page 1 (Non-Shallow)</Link>
        </h3>
        <h3>
          <Link href="/page_2" shallow>Page 2 (Shallow Route)</Link>
        </h3>
        <hr />
        <button onClick={() => fetchNextPage()}>Fetch More</button>
        <h4>Total: {flattened.length}</h4>
        <div style={{height: 300, width: 300, overflowY: 'scroll', marginTop: 12}}>
          {
            flattened.map(item => {
              return (
                <div key={item.id}>{item.data}</div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<PaginatedData>([QUERY_KEY], fetchInfiniteData, {
    retry: 0,
    staleTime: Infinity,
    cacheTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const dehydrated = dehydrate(queryClient)

  // https://github.com/TanStack/query/issues/1458
  const scrubbed = JSON.parse(JSON.stringify(dehydrated));

  return {
    props: {
      dehydratedState: scrubbed
    }
  }
}
