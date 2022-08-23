'use strict'
const { Router } = require('express')
const router = Router()
const {
  searhcFieldByNamePanel,
  enableField,
  getAllFieldsPanel,
  deleteField,
  registerField,
  getFieldById,
  getAllFields,
  getTypeFieldsFilter,
  filterByAvailability,
  sortFieldBy,
  searhcFieldByName,
  getPriceByRange,
  updateField,
  registerReviews,
  // getReviews,
  getAverage
} = require('../../controllers/field')

router.get('/', async function (request, reply) {
  try {
    const fields = await getAllFields()
    console.log(fields)
    return reply.send(fields)
  } catch (e) {
    return reply.log.error(e)
  }
})

// Routes for admin panel --> disable fields
router.get('/panel', async function (request, reply) {
  try {
    const fields = await getAllFieldsPanel()
    return reply.send(fields)
  } catch (e) {
    return reply.log.error(e)
  }
})

router.get('/panel/search', async function (request, reply) {
  try {
    const { name } = request.query
    const search = await searhcFieldByNamePanel(name)
    return reply.send(search)
  } catch (e) {
    return e
  }
})
// ------//

router.get('/typeField', async function (request, reply) {
  try {
    const { typeField } = request.query
    const bytype = await getTypeFieldsFilter(typeField)
    return reply.send(bytype)
  } catch (e) {
    return e
  }
})

router.get('/sort', async function (request, reply) {
  try {
    const { price } = request.query
    const byprice = await sortFieldBy(price)
    return reply.send(byprice)
  } catch (e) {
    return e
  }
})

router.get('/able', async function (request, reply) {
  try {
    const { active } = request.query
    const able = await filterByAvailability(active)
    return reply.send(able)
  } catch (e) {
    return reply.log.error(e)
  }
})

router.get('/search', async function (request, reply) {
  try {
    const { name } = request.query
    const search = await searhcFieldByName(name)
    return reply.send(search)
  } catch (e) {
    return e
  }
})

router.get('/rangePrice', async function (request, reply) {
  try {
    const { minPrice, maxPrice } = request.query
    const applyFilter = await getPriceByRange(minPrice, maxPrice)
    return reply.send(applyFilter)
  } catch (e) {
    return e
  }
})

router.get('/:filedId', async function (request, reply) {
  const { filedId } = request.params
  try {
    const field = await getFieldById(filedId)
    return reply.send(field)
  } catch (e) {
    return e
  }
})

router.post('/', async function (request, reply) {
  const { name, location, image, type, price, ownerId, availability } =
    request.body
  try {
    const newFiled = await registerField(
      name,
      location,
      image,
      type,
      price,
      ownerId,
      availability
    )
    return reply.send(newFiled)
  } catch (e) {
    return e
  }
})

router.delete('/:fieldId', async function (request, reply) {
  const { fieldId } = request.params
  try {
    const deletecField = await deleteField(fieldId)
    return reply.send(deletecField)
  } catch (e) {
    return e
  }
})

router.put('/:fieldId', async function (request, reply) {
  const { fieldId } = request.params
  const {
    price,
    availability,
    image,
    name,
    location,
    type,
    horario,
    isActive
  } = request.body
  try {
    const updateResult = await updateField(
      fieldId,
      price,
      availability,
      image,
      name,
      location,
      type,
      horario,
      isActive
    )
    return reply.send(updateResult)
  } catch (e) {
    return e
  }
})

router.post('/:id/reviews', async function (request, reply) {
  const fieldId = request.params.id
  try {
    const { userMail, name, rating, review } = request.body

    const newReviews = await registerReviews(
      fieldId,
      userMail,
      name,
      rating,
      review
    )
    await getAverage(fieldId)
    return reply.send(newReviews)
  } catch (e) {
    return e
  }
})

// router.get('/reviews', async function (request, reply) {
//   try {
//     const reviews = await getReviews()
//     return reply.send(reviews)
//   } catch (e) {
//     return e
//   }
// })

// Route to enable fields
router.put('/enable/:fieldId', async function (request, reply) {
  const { fieldId } = request.params
  try {
    const enabledField = await enableField(fieldId)
    return reply.send(enabledField)
  } catch (e) {
    return e
  }
})

module.exports = router
