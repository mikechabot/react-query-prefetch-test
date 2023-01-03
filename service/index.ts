export type Item = {
  id: string;
  data: string;
}

export type PaginatedData = {
  items: Item[]
  nextCursor: number
}

export const fetchInfiniteData = async ({ pageParam = 0 }): Promise<PaginatedData> => {
  const response = await fetch(`http://localhost:3000/api/infinite-data?offset=${pageParam}`)
  return response.json()
}
