const player = new Object;
let opponent;
const options = document.querySelector('.options')
const computerBtn = document.querySelector('.computer')
const friendBtn = options.querySelector(".player")


computerBtn.addEventListener("click", function(){
	opponent = computer
	switchActive(friendBtn, computerBtn)
})

friendBtn.addEventListener("click", function(){
	switchActive(xBNtn, oBtn)
})


function switchActive(off, on){
	off.classList.remove("active")
	on.classList.add("active")
}

function play(){document.getElementById("audio").play()}