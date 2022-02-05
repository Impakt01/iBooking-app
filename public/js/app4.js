const button4 = document.querySelector('.checkoutButton4')

button4.addEventListener('click', (e) => {
    e.preventDefault()
    productQuantity = document.querySelector('.quantity-class4').value
  
    fetch("/create-checkout-session4", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                {id: 4, quantity: productQuantity}
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