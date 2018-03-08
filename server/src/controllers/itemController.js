import Item from '../models/item'

export const itemToJson = (item = {}) => {
  const id = item.id || ''
  const name = item.name || ''
  const description = item.description || ''
  return { id, name, description }
}

export const getItem = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400)
      .json({ message: 'Server could not process request due to missing query parameter ' })
  }

  const item = await Item.findById(id)
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Server encountered an internal error' })
    })

  if (item) {
    return res.status(200).json(itemToJson(item))
  }

  return res.status(400).json({ message: 'Server could not locate resource' })
}

export const createItem = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Server could not process request due to missing request data' })
  }

  const item = await Item.create(req.body)
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Server encountered an internal error' })
    })

  if (item) {
    return res.status(200).json(itemToJson(item))
  }

  return res.status(400).json({ message: 'Server could not locate resource' })
}

export const updateItem = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400)
      .json({ message: 'Server could not process request due to missing request data' })
  }

  const item = await Item.findByIdAndUpdate(id, req.body, { new: true })
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Server encountered an internal error ' })
    })

  if (item) {
    return res.status(200).json(itemToJson(item))
  }

  return res.status(400).json({ message: 'Server could not locate resource' })
}

export const deleteItem = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Server could not process request, missing query parameter' })
  }

  const item = await Item.findByIdAndRemove(id)
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Server encountered an internal error' })
    })

  if (item) {
    return res.status(200).json(item)
  }

  return res.status(400).json({ message: 'Server could not locate resource for removal' })
}
