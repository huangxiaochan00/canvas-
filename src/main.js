let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext('2d');
ctx.strokeStyle = 'none';
ctx.lineCap = "round"
let textColor = "black"
let bgColor = 'white'
let color = textColor
let state = 1
ctx.lineWidth = 4
let last
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.stroke();
}
function getID(id) {
    return document.getElementById(id)
}
const pen = getID('pen')
const clean = getID('clean')
const background = getID('backGround')
const black = getID('black-color-btn')
const green = getID('green-color-btn')
const blue = getID('blue-color-btn')
const white = getID('white-color-btn')
const pink = getID('pink-color-btn')
const yellow = getID('yellow-color-btn')
const rangeIpt = getID('rangeIpt')

pen.onclick = function () {
    color = textColor
    state = 1
    pen.classList.add('active')
    clean.classList.remove('active')
    background.classList.remove('active')
}
clean.onclick = function () {
    color = bgColor
    state = 2
    pen.classList.remove('active')
    clean.classList.add('active')
    background.classList.remove('active')
}
background.onclick = function () {
    state = 3
    pen.classList.remove('active')
    clean.classList.remove('active')
    background.classList.add('active')
}
black.onclick = function () {
    change('black')
}
green.onclick = function () {
    change('green')
}
blue.onclick = function () {
    change('blue')
}
white.onclick = function () {
    change('white')
}
pink.onclick = function () {
    change('pink')
}
yellow.onclick = function () {
    change('rgb(252, 252, 107)')
}
function change(x) {
    if (state === 3) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = x
        bgColor = x
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return false;
    }
    else if (state == 1) {
        textColor = x
        color = textColor

    }
}
document.getElementById('rangeIpt').onchange = function () {
    ctx.lineWidth = document.getElementById('rangeIpt').value
    console.log(ctx.lineWidth);
}
let painting = false;

var isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        last = [x, y]
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY

        drawLine(last[0], last[1], x, y)
        last = [x, y]
    }

} else {

    canvas.onmousedown = (e) => {
        painting = true
        last = [e.clientX, e.clientY]
    }
    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }

    }
    canvas.onmouseup = () => {
        painting = false
    }
}