console.log('Client-side JS loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Important!!

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Please Wait...'

    // Fetch API, Client-side API
    fetch('/weather?address='+ encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else{
                messageOne.textContent = 'Showing weather of: ' + data.location
                messageTwo.textContent = 'Probability of Rain: ' + data.forecast.rainProb + '. ' + data.forecast.summary + ' The temperature is: ' + data.forecast.temperature + ' in degree Celcius.'
            }
        })    
    })

})