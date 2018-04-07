//获取时间
var scoreDiv = document.querySelector('.score');
var timeDiv = document.querySelector('.timing');
var wolvesDiv = document.querySelector('.wolves');
var text1 = document.querySelector('.text1');
var startDiv = document.querySelector('.start');
var endDiv = document.querySelector('.end');
var once = document.querySelector('.once');
var posArr = [['98px','115px'],['17px','160px'],['15px','220px'],['30px','293px'],
['122px','273px'],['207px','295px'],['200px','211px'],['187px','141px'],['100px','185px']];
var timer2;
var score = 0;
//点击开始事件
startDiv.onclick = function(){
	text1.style.display = 'none';
	once.style.display = 'none';
	countDownFn();
	moreWolf();

}

function countDownFn(){
	var num = 180;
	var timer1 = setInterval(function(){
		if(num >= 0){
			num--;
			timeDiv.style.width = num + 'px';
		}else{
			clearInterval(timer1);
			gameOverFn();
		}
	},100);
}
function gameOverFn(){
	endDiv.style.display = 'block';
	clearInterval(timer2);
	once.style.display = 'block';
}

function randomNum(num1,num2){
	return parseInt(Math.random() * (num2 - num1 + 1) + num1);
}
function createWolf(){
	var wolf = new Image();
	var isHave = true;
	wolf.type = randomNum(1,100) > 80 ? 'x':'h';
	wolf.index = 0;
	var posIndex;
	while(isHave){
		posIndex = randomNum(0,8);
		var wolves = wolvesDiv.children;
		for(i = 0;i < wolves.length;i++){
			if(wolves[i].style.left == posArr[posIndex][0]){
				break;
			}
		}
		if(i == wolves.length){
			isHave = false;
		}
	}
	wolf.src = 'img/' + wolf.type + wolf.index + '.png';
	wolf.style.position = 'absolute';
	wolf.style.left = posArr[posIndex][0];
	wolf.style.top = posArr[posIndex][1];
	wolvesDiv.appendChild(wolf);
	return wolf;
}

function wolfFlash(){
	var wolf = createWolf();
	wolf.appearTimer = setInterval(function(){
		wolf.index++;
		wolf.src = 'img/' + wolf.type + wolf.index + '.png';
		if(wolf.index >= 5){
			clearInterval(wolf.appearTimer);
			wolf.disappearTimer = setInterval(function(){
				wolf.index--;
				wolf.src = 'img/' + wolf.type + wolf.index + '.png';
				if(wolf.index <= 0){
					clearInterval(wolf.disappearTimer);
					wolf.remove();
				}
			},100);
		}
	},100);
	wolfClick(wolf);
}

function wolfClick(wf){
	wf.isClick = true;
		wf.onclick = function(){
			if(wf.isClick){
		wf.isClick = false;
		clearInterval(wf.appearTimer);
		clearInterval(wf.disappearTimer);
			wf.index = 6;
			wf.src = 'img/' + wf.type + wf.index + '.png';
			var timer1 = setInterval(function(){
				wf.index++;
				wf.src = 'img/' + wf.type + wf.index + '.png';
				if(wf.index >= 9){
					clearInterval(timer1);
					wf.remove();
				}
			},100);
			if(wf.type == 'h'){
				score += 10;
			}else{
				score -= 10;
			}
			scoreDiv.innerText = score;
		}
	}
}

function moreWolf(){
	timer2  = setInterval(wolfFlash,1000);
}

once.onclick = function(){
	scoreDiv.innerHTML = 0;
	score = 0;
    once.style.display = 'none';
    endDiv.style.display = 'none';
    countDownFn();
  moreWolf();
}

