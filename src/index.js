require('dotenv').config()
const mongoose =  require('mongoose')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const User = require('./model/user')
const Task = require('./model/task')
const fs = require('fs')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

const app = express()
const port = process.env.PORT || 3000

const publicFilesPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicFilesPath))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.json())

// PAGES ROUTES

app.get('/signup', (req, res) => {
    res.render('signup')})
app.get('/login', (req, res) => {
    res.render('login')})
app.get('/admin-panel', async (req, res) => {
    res.redirect('login')})
app.get('/booking', (req, res) => {
    res.render('booking')})

app.get('/index', (req, res) => {
    fs.readFile('./products.json', 'utf-8', (error, data) => {
        if (error) {
        res.status(500).send('something is wrong')
        } else {
            const products = JSON.parse(data)
           const rawProducts = products.featuredProducts
           
            res.render('index', {
                productsInfo: rawProducts
            })
        }
    })
})

app.get('/cart', (req, res) => {
    res.render('cart')
})

app.get('/admin-delete', (req, res) => {
  res.render('admin-delete')
})

// stripe


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1, { priceInCents: 3000, name: 'beard-oil'}],
    [2, { priceInCents: 599, name: 'tweezer'}],
    [3, { priceInCents: 5000, name: 'wig'}],
    [4, { priceInCents: 1599, name: 'lipglossp'}]
])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
              },
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    }
                  }
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'usd',
                    },
                    display_name: 'Next day air',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    }
                  }
                },
              ],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message})
    }
  
})

app.post('/create-checkout-session2', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
              },
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    }
                  }
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'usd',
                    },
                    display_name: 'Next day air',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    }
                  }
                },
              ],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message})
    }
  
})



app.post('/create-checkout-session3', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
              },
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    }
                  }
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'usd',
                    },
                    display_name: 'Next day air',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    }
                  }
                },
              ],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message})
    }
  
})

app.post('/create-checkout-session4', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
              },
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    }
                  }
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'usd',
                    },
                    display_name: 'Next day air',
                    
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    }
                  }
                },
              ],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message})
    }
  
})








// user routes
app.post('/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).render('login', { 
            successful: 'you have succesfully signed up. ckick on login'
        })
        
    } catch (e) {
        res.status(400).send({
            error: 'invalid particulars try again'
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        if (!user) {
            return res.send('<h2> Authorization Failed</h2>')
        }

        const tasks = await Task.find({})

         res.render('admin-panel', {
            clientInfo: tasks
        })

    } catch (e) {
        res.status(400).send('<h2>Authorization Failed </h2>')
    }
})

app.post('/booking', async (req, res) => {
    const task = new Task(req.body)
    try {
      await task.save()
      res.status(201).render('success', { 
        successful: 'you have succesfully signed up. ckick on login'
    })
        
    } catch (e) {
        res.status(400).send('<h2>unableto book. Kindly check your internet connection</h2>')
    }
})


app.get('/delete', async (req, res) => {
    try {
     await Task.deleteMany({})
       res.redirect('admin-delete')
    } catch (e) {
       res.status(500).send('<h2>unable to delete. Kindly check your network connections</h2>')
    }
})









app.listen(port, () => {
    console.log('server is up')
})



