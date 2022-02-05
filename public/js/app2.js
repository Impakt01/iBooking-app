const button2 = document.querySelector('.checkoutButton2')

button2.addEventListener('click', (e) => {
    e.preventDefault()
    productQuantity = document.querySelector('.quantity-class2').value
  
    fetch("/create-checkout-session2", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                {id: 2, quantity: productQuantity}
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
