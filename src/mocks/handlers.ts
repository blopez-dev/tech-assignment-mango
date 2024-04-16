import { rest } from 'msw'

export const handlers = [
  rest.get('https://demo6713668.mockable.io/range', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ min: 1, max: 100 }) // Example of range data
    )
  })
]
