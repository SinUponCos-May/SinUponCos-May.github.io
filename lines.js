const $ = el => document.querySelector(el)

const horizontal = $(".horizontal")
const vertical = $(".vertical")

for(let i = 0 ; i < 99 ; i++){
    const line = document.createElement("div")
    line.classList.add("line")
    horizontal.appendChild(line)
    vertical.appendChild(line)
}