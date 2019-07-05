const API_BASE = 'https://ar-game-backend.herokuapp.com/'

export const PATH = {
  auth: `${API_BASE}authenticate`,
  leaders: `${API_BASE}leaders`,
  new_user: `${API_BASE}new_user`,
  submit_score: `${API_BASE}submit_score`
}

export const DISPLAY_ELEMENTS = {
  completionTime: document.querySelector('#win-time-display'),
  newRecord: document.querySelector('#new-record-display'),
  menu: document.querySelector('.menu')
}

export const AUTH_ELEMENTS = {
  signInForm: document.querySelector('.sign-in-form'),
  signInButton: document.querySelector('.sign-in-button'),
  signUpButton: document.querySelector('#sign-up-button'),
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  confirmPassword: document.querySelector('#confirm-password'),
  replayButton: document.querySelector('#replay-button'),
  submitScoreButton: document.querySelector('#submit-score-button')
}

export const MENU_TOGGLES = {
  menu: document.querySelector('#menu-toggle'),
  authentication: document.querySelector('#sign-in-toggle'),
  leaderBoard: document.querySelector('#leader-board-toggle'),
  winBox: document.querySelector('#win-box-toggle'),
  instructions: document.querySelector('#instruction-toggle')
}
