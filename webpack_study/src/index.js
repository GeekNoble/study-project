import './main.css'
import './main.scss'

import logo from '../public/logo.png'

const a = 'Hello ITEM'
console.log(a)

const img = new Image()
img.src = logo

document.getElementById('imgBox').appendChild(img)
