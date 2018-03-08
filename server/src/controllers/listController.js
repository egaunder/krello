import List from '../models/list'

export const listToJson = (list = {}) => {
  const id = list.id || ''
  const name = list.name || ''
  const items = list.items || []
  const jsonList = { id, name, items }
  return jsonList
}

export const getList = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Server could not process request, missing query parameter' })
  }
  const list = await List.findById(id).catch(err => {
    console.error(err)
    return res.status(400).json({ message: 'Server could not locate resource' })
  })

  if (list) {
    return res.status(200).json(listToJson(list))
  }

  return res.status(400).json({ message: 'Server could not locate resource' })
}

export const createList = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Server could not process request, missing request data' })
  }

  const savedList = await List.create(req.body)
    .catch(err => res.status(500).json({ message: 'Server count not save resource', error: err }))

  return res.status(200).json(listToJson(savedList))
}

export const updateList = async (req, res) => {
  const { id, name } = req.body
  if (!id && !name) {
    return res.status(400).json({ message: 'Server could not process request, missing request data' })
  }

  const updatedList = await List.findByIdAndUpdate(id, req.body, { new: true })
    .catch(err => res.status(500).json({
      message: 'Server encountered an internal error trying to update resource',
      error: err,
    }))
  if (updatedList) {
    return res.status(200).json(listToJson(updatedList))
  }

  return res.status(400).json({ message: 'Server could not update resource' })
}

export const deleteList = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Server could not process request, missing query parameter' })
  }

  const removedList = await List.findByIdAndRemove(id)
    .catch(err => res.status(500).json({ message: 'Server could not locate resource for removal', error: err }))

  if (removedList) {
    return res.status(200).json(listToJson(removedList))
  }

  return res.status(400).json({ message: 'Server could not remove resource' })
}
