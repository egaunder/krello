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

  test('should create an new item', async done => {
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

  test('should find an item', async done => {
    const name = 'Do homework'
    const description = 'Its due Tuesday'
    const item = {
      name,
      description,
    }

    await Item.create(item)

    const foundItem = await Item.findOne({ name, description })
    expect(foundItem.name).toBe(name)
    expect(foundItem.description).toBe(description)

    done()
  })

  test('should update an item', async done => {
    const name = 'Fill up gas'
    const description = 'Prius is low on gas'

    const item = {
      name,
      description,
    }

    const createdItem = await Item.create(item)
    createdItem.name = 'Fill up gas in MDX'
    const updatedItem = await createdItem.save()
    expect(updatedItem.name).toBe(createdItem.name)
    done()
  })

  test('should delete an item', async done => {
    const name = 'Deleted item'
    const description = 'Deleted description'

    const item = { name, description }
    await Item.create(item)

    const deletedItem = await Item.findOneAndRemove({ name })
    expect(deletedItem.name).toBe(name)
    expect(deletedItem.description).toBe(description)
    done()
  })
})
