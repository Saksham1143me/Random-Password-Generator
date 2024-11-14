const inputSlider = document.querySelector("[data-inputSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const passDisplay = document.querySelector("[data-passwordDisplay]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copybtn=document.querySelector(".copy")
const copyMsg = document.querySelector("[data-copyMsg]");
let passwordLength = 1;
handleSlider();
setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
inputSlider.addEventListener('input', (event) => {
    passwordLength = parseInt(event.target.value);
    handleSlider();
});
const uppercase=/[A-Z]/;
function setIndicator(color){
    let indicator=document.querySelector("[data-indicator]")
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0 0 37px 3px ${color}`
}
const uppercaseCheckbox = document.querySelector(".uppercase");
const lowercaseCheckbox = document.querySelector(".lowercase");
const numbersCheckbox = document.querySelector(".numbers");
const symbolsCheckbox = document.querySelector(".symbols");
function strengthcalc(){
    let hasUpper = uppercaseCheckbox.checked;
    let hasLower = lowercaseCheckbox.checked;
    let hasNumber = numbersCheckbox.checked;
    let hasSymbol = symbolsCheckbox.checked;
    if (((hasUpper && hasLower) && (hasNumber || hasSymbol)) && passwordLength >= 8) {
        setIndicator("#0f0"); // Green for strong password
    } else if ((hasUpper || hasLower) && (hasSymbol || hasNumber) && passwordLength >= 8) {
        setIndicator("#ff0"); // Yellow for medium password
    } else {
        setIndicator("#f00"); // Red for weak password
    }

}
let generatebtn=document.querySelector(".generatebtn")
generatebtn.addEventListener("click",()=>{
    if(checkCount == 0) 
        return;
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password="";
    arr=[]
    // arr is array of functions means it contains functions:
    // the functions are:
    // getRandomUppercase
    // getRandomLowercase
    // getRandomNumber
    // getRandomSymbol
    // By doing arr.push(getRandomUppercase), 
    // you add the function itself (not the result of the function)
    //  to the array arr.
    //  This means arr will now contain references to the function(s).
if(uppercaseCheckbox.checked) arr.push(getRandomUppercase)
if(lowercaseCheckbox.checked) arr.push(getRandomLowercase)
if(numbersCheckbox.checked) arr.push(getRandomNumber)
if(symbolsCheckbox.checked) arr.push(getRandomSymbol)
    console.log(arr)
for(let i=0;i<arr.length;i++){
 password+=arr[i]();
}
for(let i=0; i<passwordLength-arr.length; i++) {
    let randIndex = getRandomVal(0 , arr.length);
    password += arr[randIndex]();
}
password=shufflePassword(password)
passDisplay.value = password;
strengthcalc();
})
function getRandomVal(min,max){
    return Math.floor((max-min)*Math.random()+min)
}
console.log(getRandomVal(0,9))
function getRandomUppercase(){
    return String.fromCharCode(getRandomVal(65,91))
}
function getRandomLowercase(){
    return String.fromCharCode(getRandomVal(97,123))
}function getRandomNumber(){
    return getRandomVal(0,9)
}function getRandomSymbol(){
   let randSymbolVal=getRandomVal(0,symbols.length)
   return symbols.charAt(randSymbolVal)
}
let checkCount = 0;
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((e)=>{
    e.addEventListener("change",handleCheckBoxChange)
})
function shufflePassword(password) {
    // Fisher-Yates shuffle algorithm
    let array = password.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
copybtn.addEventListener("click",()=>{
   if(passDisplay.value){
    copyContent();
   }\
})
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}