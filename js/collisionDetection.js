// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

// 定义小球构造器
function Ball(x , y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;    
}

// 定义画小球的方法
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
}

// 定义小球移动的方法（触碰边缘后自动弹回）
Ball.prototype.update = function() {
    //检查小球是否触碰右边缘
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    //检查小球是否触碰左边缘
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    //检查小球是否触碰上边缘
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    //检查小球是否触碰下边缘
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    //让小球更新位置
    this.x += this.velX;
    this.y += this.velY;  
}

// 定义小球碰撞检测
Ball.prototype.collisionDetection = function() {
    for (let j=0; j< balls.length; j++) {
        if(!(this === balls[j])) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color =randomColor();
                balls[j].velX = -(balls[j].velX);
                balls[j].velY = -(balls[j].velY);
                this.velX = -(this.velX);
                this.velY = -(this.velY);
            }
        }
    }
}

// 存储小球实例
let balls = [];

// 让小球动起来
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);
    // 控制小球的数量
    while (balls.length < 25) {
        let ball = new Ball(
            random(20,width-20),
            random(20,height-20),
            random(-6,6),
            random(-6,6),
            randomColor(),
            random(10,20)
        );
        balls.push(ball);
    }
    // 让每个小球调用draw()和update()
    for (let i=0; i<balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetection();
    }
    // 让函数每次运行时都调用自己
    requestAnimationFrame(loop);
}

loop()