import axios from 'axios'
import getPort from 'get-port'

import startServer from '../../start'
import Item from '../../models/item'

describe('Item routes', () => {
  let server
  let baseURL

  beforeAll(async () => {
    const port = await getPort()
    server = await startServer({ port })
    baseURL = `http://localhost:${server.address().port}/api/items`
  })

  afterAll(async () => {
    await server.close()
  })

  test('should create an Item', async done => {
    const name = 'Pickup dry cleaning'
    const item = { name }
    const createdItem = await axios.post(baseURL, item).then(res => res.data)

    expect(createdItem.name).toBe(name)
    Item.findByIdAndRemove(createdItem.id)
    done()
  })

  test('should get an Item', async done => {
    const name = 'Pickup dry cleaning'
    const item = { name }

    const createdItem = await Item.create(item)
    const getItem = await axios.get(`${baseURL}/${createdItem.id}`).then(res => res.data)

    expect(getItem.id).toBe(createdItem.id)
    Item.findByIdAndRemove(getItem.id)
    done()
  })

  test('should update an Item', async done => {
    const name = 'Drop clothes to dry cleaning'
    const newName = 'Dropped clothes to dry cleaning'
    const newItem = { name }

    const postItem = await axios.post(baseURL, newItem).then(res => res.data)
    const updatedItem = { name: newName }
    const putItem = await axios.put(baseURL, Object.assign({}, postItem, updatedItem))
      .then(res => res.data)
    expect(putItem.name).toBe(newName)
    Item.findByIdAndRemove(putItem.id)
    done()
  })

  test('should delete a Item', async done => {
    const item = { name: 'Testing' }

    const savedItem = await Item.create(item)
    const deletedItem = await axios.delete(`${baseURL}/${savedItem.id}`)
      .then(res => res.data)
    expect(deletedItem.name).toBe('Testing')
    done()
  })
})
