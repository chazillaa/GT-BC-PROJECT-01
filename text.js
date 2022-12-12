function userInput(){
    cityInput = document.getElementById(`userInput`).value
    var cityInputCap = cityInput.charAt(0)
    var cityInputFirstCap = cityInputCap.toUpperCase(0)
    var cityInputFinal = cityInputFirstCap + cityInput.slice(1)
    console.log(cityInput)
    console.log(cityInputCap)
    console.log(cityInputFirstCap)
    console.log(cityInputFinal)
}

$(`#myButton`).on(`click`, userInput)












