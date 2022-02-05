const button = document.querySelector('.checkoutButton')

button.addEventListener('click', (e) => {
    e.preventDefault()
    productQuantity = document.querySelector('.quantity-class').value
  
    fetch("/create-checkout-session", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                {id: 1, quantity: productQuantity}
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





