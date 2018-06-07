const numbers = []
const maxNum = 1000
for (let i = 0; i < maxNum; i += 1) {
  numbers.push(i)
}

export const pagination = (req, res) => {
  let { limit, start } = req.query

  limit = limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10
  start = start && parseInt(limit, 10) >= 0 ? parseInt(start, 10) : 0

  const nums = numbers.slice(start, start + limit)

  if (nums.length) {
    return res.json({ numbers: numbers.slice(start, start + limit) })
  }

  return res.json({ numbers: numbers.slice(0, 10) })
}

export const test = (req, res) => res.json({ success: 'yay' })
