import { boardToJson } from '../boardController'

describe('[ boardToJson ]', () => {
  test('should return an object', () => {
    const result = boardToJson()
    expect(typeof result).toBe('object')
  })

  test('should return a json formatted board if given full board object', () => {
    const fullBoard = {
      id: 'jfsk45j35i2oj423lk',
      name: 'Study Topics',
      userId: 23,
      category: 'Studies',
      created_at: '2018-02-10T14:24:48.686Z',
      updated_at: '2018-02-10T14:24:48.686Z',
    }

    const jsonBoard = {
      id: 'jfsk45j35i2oj423lk',
      name: 'Study Topics',
      userId: 23,
      category: 'Studies',
    }

    const result = boardToJson(fullBoard)
    expect(result).toEqual(jsonBoard)
  })
})
