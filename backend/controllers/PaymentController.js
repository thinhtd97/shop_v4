import expressAsyncHandler from 'express-async-handler'
import Stripe from 'stripe'
const stripe = new Stripe(
  'sk_test_51IcTOcFCGbTef4XnDpnri2Uiv2NrFciikbJ06STgqpYUWRU9Gk7zG1ZM9WqScWGPCu1FrBmStoqcsp85v6ZWMWyL00097byMkC',
)
import { v4 as uuidv4 } from 'uuid'

export const paymentStripe = expressAsyncHandler(async (req, res) => {
  const { product, token } = req.body
  const idempotencyKey = uuidv4()
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country,
              },
            },
          },
          {
            idempotencyKey,
          },
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    })
  console.log(token, product)
  res.json('ok')
})
