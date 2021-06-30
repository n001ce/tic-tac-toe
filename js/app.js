const player = new Object;
let opponent;
const canvas = document.getElementById("cvs")
const ctx = canvas.getContext("2d")
const options=document.querySelector('.options')
const computerBtn = document.querySelector('.computer')
const friendBtn = options.querySelector(".friend");
const xBtn = options.querySelector(".x")
const oBtn = options.querySelector(".o")
const playBtn = options.querySelector(".play")

ctx.fillRect(150, 100, 50, 50)
ctx.strokeRect(250, 200, 50, 50)

computerBtn.addEventListener("click", function(){
	opponent = computer
	switchActive(friendBtn, computerBtn)
})

friendBtn.addEventListener("click", function(){
	player.man="O"
	player.friend="X"
	switchActive(xBNtn, oBtn)
})

xBtn.addEventListener("click", function(){
	player.man="X"
	player.computer="O"
	player.friend ="O"
})

playBtn.addEventListener("click", function(){
	if(!opponent){
		computerBtn.style.backgroundColor="red"
		friendBtn.style.background ="red"
		return
	}
	if(!player.man){
		oBtn.style.background="red"
		xBtn.style.background="red"
		return		
	}
	init(player, opponent)
	options.classList.add('hide')
})


function switchActive(off, on){
	off.classList.remove("active")
	on.classList.add("active")
}