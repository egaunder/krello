import List from '../list'
import { initializeTestDb, clearTestDb } from '../../utils/test_helper'

describe('Lists', () => {
  beforeAll(() => initializeTestDb())
  afterAll(() => clearTestDb())

  test('should be invalid if name is empty', async done => {
    const list = new List()
    await list.validate(err => {
      expect(err.errors.name).toBeDefined()
      done()
    })
  })

  test('should create a list', async done => {
    const name = 'Created list'
    const newList = await List.create({ name })
    expect(newList.name).toBe(name)
    done()
  })

  test('should update a list', async done => {
    const name = 'Update list'
    const newName = 'Name has been changed'
    const list = await List.create({ name })
    list.name = newName
    const updatedList = await list.save()
    expect(updatedList.name).toBe(newName)
    done()
  })

  test('should delete a list', async done => {
    const name = 'Delete list'
    await List.create({ name })
    const deletedList = await List.findOneAndRemove({ name })
    expect(deletedList.name).toBe(name)
    done()
  })
})
