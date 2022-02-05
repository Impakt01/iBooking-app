const button3 = document.querySelector('.checkoutButton3')

button3.addEventListener('click', (e) => {
    e.preventDefault()
    productQuantity = document.querySelector('.quantity-class3').value
  
    fetch("/create-checkout-session3", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                {id: 3, quantity: productQuantity}
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url}) => {
       window.location = url
    }).catch (e => {
        console.error(e.error)
    })
})