import Item from '../item'
import { initializeTestDb, clearTestDb } from '../../utils/test_helper'

describe('Items', () => {
  beforeAll(() => initializeTestDb())

  afterAll(() => clearTestDb())

  test('should be invalid if name is empty', () => {
    const item = new Item()

    item.validate(err => {
      expect(err.errors.name).toBeDefined()
    })
  })

  test('should create a new item', async done => {
    const name = 'Pickup Laundry'
    const description = 'dont\'t forget to pickup the laundry'

    const item = new Item({
      name,
      description,
    })

    const savedItem = await item.save()

    expect(savedItem.name).toBe(name)
    expect(savedItem.description).toBe(description)
    done()
  })
})
