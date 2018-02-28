import axios from 'axios'
import getPort from 'get-port'

import startServer from '../../start'
import List from '../../models/list'

describe('List routes', () => {
  let server
  let baseURL

  beforeAll(async () => {
    const port = await getPort()
    server = await startServer({ port })
    baseURL = `http://localhost:${server.address().port}/api/lists`
  })

  afterAll(async () => {
    await server.close()
  })

  test('should create a list', async done => {
    const name = 'Todo'
    const list = { name }

    const createdList = await axios.post(baseURL, list).then(res => res.data)

    expect(createdList.name).toBe(name)
    List.findByIdAndRemove(createdList.id)
    done()
  })

  test('should get a list', async done => {
    const name = 'Get Todo'
    const list = { name }

    const createdList = await List.create(list)

    const getList = await axios.get(`${baseURL}/${createdList.id}`).then(res => res.data)

    expect(getList.id).toBe(createdList.id)
    List.findByIdAndRemove(getList.id)
    done()
  })

  test('should update a list', async done => {
    const name = 'Doing'
    const newName = 'Done'
    const newList = { name }

    const postList = await axios.post(baseURL, newList).then(res => res.data)
    const updatedList = { name: newName }
    const putList = await axios.put(baseURL, Object.assign({}, postList, updatedList))
      .then(res => res.data)
    expect(putList.name).toBe(newName)
    List.findByIdAndRemove(putList.id)
    done()
  })

  test('should delete a list', async done => {
    const list = { name: 'Testing' }

    const savedList = await List.create(list)
    const deletedList = await axios.delete(`${baseURL}/${savedList.id}`)
      .then(res => res.data)
    expect(deletedList.name).toBe('Testing')
    done()
  })
})
