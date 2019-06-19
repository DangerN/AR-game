import {PATH, DISPLAY_ELEMENTS, AUTH_ELEMENTS, MENU_TOGGLES} from './constants.js'

initializeMenu()

function initializeMenu() {
  AUTH_ELEMENTS.signInForm.addEventListener('submit', handleSignIn)
  AUTH_ELEMENTS.signUpButton.addEventListener('click', handleSignUp)
  DISPLAY_ELEMENTS.menu.addEventListener('win', handleWin)
  getLeaderBoard()
  checkLoginStatus() ? cycleMenu() : cycleGuestMenu()
}

function cycleMenu() {
  toggleMenu(['menu','leaderBoard'])
  setTimeout(_=>toggleMenu(['menu','leaderBoard'], 'closed'), 3500)
}

function cycleGuestMenu() {
  toggleMenu(['menu','instructions'])
  setTimeout(_=>toggleMenu(['menu','instructions'], 'closed'), 12000)
}

function checkLoginStatus() {
  if (window.localStorage.getItem('token')) {
    logIn(window.localStorage.getItem('name'))
    return true
  } else {
    return false
  }
}

function handleWin(event) {
  let times = document.querySelectorAll('.leader-time')
  DISPLAY_ELEMENTS.completionTime.innerText = event.detail
  AUTH_ELEMENTS.replayButton.addEventListener('click', _=>location.reload())
  AUTH_ELEMENTS.submitScoreButton.addEventListener('click', _=>submitScore(event.detail))
  if([...times].filter(time=>time.innerText < event.detail).length === 0)
  {
    DISPLAY_ELEMENTS.newRecord.style.fontSize = '16px'
  }
  toggleMenu(['menu', 'leaderBoard', 'winBox'])
}

function submitScore(time) {
  if (!!window.localStorage.getItem('token')) {
    let body = {
      user_id: window.localStorage.getItem('user_id'),
      time: time
    }
    fetch(PATH.submit_score, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify(body)
    }).then(response=>response.json())
      .then(handleSubmitResponse)
  } else {
    redShadowPulse(AUTH_ELEMENTS.submitScoreButton)
  }
}

function handleSubmitResponse(response) {
  displayLeaderBoard(response)
}

function toggleMenu(toggleList = Object.keys(MENU_TOGGLES), status = 'open') {
  let toggleDirection = status === 'open' ? true : false
  toggleList.forEach(toggle=>{MENU_TOGGLES[toggle].checked = toggleDirection})
}

function handleSignIn(event) {
  event.preventDefault()
  let loginCredentials = {
    name: AUTH_ELEMENTS.username.value,
    password: AUTH_ELEMENTS.password.value
  }
  fetch(PATH.auth,{
    method: 'POST',
    headers: {'Content-Type': 'application/json '},
    body: JSON.stringify(loginCredentials)
  }).then(response=>response.json())
    .then(handleAuthResponse)
}

function handleAuthResponse(response) {
  response.auth_token ? authSuccess(response) : authFailed()
}

function authSuccess(response) {
  window.localStorage.setItem('token', response.auth_token)
  window.localStorage.setItem('name', response.name)
  window.localStorage.setItem('user_id', response.id)
  logIn(response.name)
}

function logIn(name) {
  destroyChildren(AUTH_ELEMENTS.signInForm)
  MENU_TOGGLES.authentication.checked = false
  AUTH_ELEMENTS.signInForm.style.maxHeight = '16px'
  AUTH_ELEMENTS.signInButton.innerText = name
  AUTH_ELEMENTS.signInForm.appendChild(signOutButton())
}

function destroyChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function signOutButton() {
  let signOutButton = document.createElement('input')
  signOutButton.classList.add('login-input')
  signOutButton.value = 'Log Out'
  signOutButton.type = 'button'
  signOutButton.addEventListener('click', logOut)
  return signOutButton
}

function logOut() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('name')
  location.reload()
}

function authFailed() {
  clearAuthInputs()
  redShadowPulse(AUTH_ELEMENTS.signInForm)
}

function clearAuthInputs() {
  AUTH_ELEMENTS.username.value = ''
  AUTH_ELEMENTS.password.value = ''
}

function redShadowPulse(element) {
  let shadowRadius = 50
  let animationInterval = setInterval(frame, 20)
  function frame() {
    if (shadowRadius == 0) {
      clearInterval(animationInterval)
    } else {
      shadowRadius -= 5
      element.style.boxShadow = `0px 0px ${shadowRadius}px rgba(255, 0, 0, 1)`
    }
  }
}

function handleSignUp(event) {
  let signUpRequestBody = {
    name: AUTH_ELEMENTS.username.value,
    password: AUTH_ELEMENTS.password.value
  }
  fetch(PATH.new_user,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(signUpRequestBody)
  })
    .then(response=>response.json())
    .then(handleAuthResponse)
}

function getLeaderBoard() {
  fetch(PATH.leaders)
    .then(response=>response.json())
    .then(displayLeaderBoard)
}

function displayLeaderBoard(leaderList) {
  let oldTimes = document.querySelectorAll('.leader-time')
  console.log('oldTimes', oldTimes);
  if (oldTimes.length > 0) {
    oldTimes.forEach(time=>time.parentNode.parentNode.removeChild(time.parentNode))
  }
  let leaderBoard = document.querySelector('.leader-board')
  let leaderElements = leaderList.map(leader=>{
     let li = document.createElement('li')
     li.innerHTML = `<span>${leader.name}</span><span class='leader-time'>${leader.time}</span>`
     return li
  })
  leaderElements.forEach(element=>leaderBoard.appendChild(element))
  return leaderList
}
