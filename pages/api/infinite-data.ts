import crypto from 'crypto'

import type { NextApiRequest, NextApiResponse } from 'next'
import {Item, PaginatedData} from "../../service";

const PAGE_SIZE = 25;

function getPaginatedData(offset: number, nextCursor: number): Item[] {
  const items = [];
  for (let i = offset; i < nextCursor; i += 1) {
    items.push({
      id: crypto.randomUUID(),
      data: `Item: ${i}`
    })
  }
  return items
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedData>
) {
  const offset = Number((req.query?.offset as string));
  const nextCursor = offset + PAGE_SIZE;

  res.json({
    items: getPaginatedData(offset, nextCursor),
    nextCursor,
  })
}
