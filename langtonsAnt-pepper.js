//Author: Kris Swartzbaugh
//Description: Executable Javascript p5.js file for Project 1: Langton's Ant 


//ant class for managing our ant object
class ant {
  constructor(x, y) {
    this.position = createVector(x, y);
    //position of the ant (top left corner of the square it is in)
    this.direction = 0;
    //direction ant is facing (0->up, 1->right, 2->down, 3->left)
  }

//moves ant forward in direction currently facing 
  move() {
    if (this.direction == 0) this.position.y--
    //up
    if (this.direction == 1) this.position.x++
    //right
    if (this.direction == 2) this.position.y++
    //down
    if (this.direction == 3) this.position.x--
    //left
  }


  //display the triangle for langston's ant in the appropriate direction
  display() {
    fill('white');
    if (this.direction ==0) { triangle(this.position.x*boxW+boxW/2, this.position.y*boxW,this.position.x*boxW+boxW-1, this.position.y*boxW+12, this.position.x*boxW, this.position.y*boxW+12) 
    } else if (this.direction == 1){
      triangle(this.position.x*boxW, this.position.y*boxW, this.position.x*boxW+boxW-1, this.position.y*boxW+boxW/2, this.position.x*boxW, this.position.y*boxW+boxW)
    } else if (this.direction==2){
      triangle (this.position.x*boxW, this.position.y*boxW, this.position.x*boxW +boxW, this.position.y*boxW, this.position.x*boxW + boxW/2,this.position.y*boxW + boxW)
    }  else if (this.direction==3) { triangle(this.position.x*boxW+boxW, this.position.y*boxW, this.position.x*boxW, this.position.y*boxW+boxW/2, this.position.x*boxW+boxW, this.position.y*boxW+boxW)
    }
    }


  

 //turn ant 90 counterclockwise
  left() {
    this.direction--;
    if (this.direction < 0) this.direction = 3;
  }
  

//turn ant 90 clockwise 
  right() {
    this.direction++;
    if (this.direction > 3) this.direction = 0;    
  }
  
}






function setup() { 
  createCanvas(500, 500);
  frameRate(8);
//create canvas for drawing 
//.75 frame rate recommended to observe steps slowly, 50 for fast processing

rows = 41;
//same # rows as columns so will only use 1 var
boxW = width / rows;
//width of one box in the grid (~12)
myAnt = new ant (floor(rows/2), floor(rows/2));
//creates out ant object
steps = 0;
//variable to keep track of ant steps, must execute 1000+ steps per project guidelines
algStep = 0;
//variable to keep track of what step on the algorithm we are, 0 is initializing (only used at project launch), 1 is detect cell color and change accordingly, 2 is increment cell color underneath, 3 is move forward to new cell


  //create a matrix representation of our grid 
  grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i].push(0);
    }
  }
  
} 




function draw() { 

if (steps>1100) noLoop()
//end execution of the draw loop once the determined number of steps is reached (1000+ per project guidelines)
//ant moves every other step, one step to display position in new block before rotating and moving on



  background(255);
  const x = myAnt.position.x;
  const y = myAnt.position.y;
  //establish x,y 
  

 if (algStep==1){
    //Algorithm step 1: Detect cell color and change ant direction accoridingly
      if (grid[x][y] == 0) myAnt.left();
      if (grid[x][y] == 1) myAnt.right();
      if (grid[x][y] == 2) myAnt.left();
      if (grid[x][y] == 3) myAnt.right();
      if (grid[x][y] == 4) myAnt.left();
}else if (algStep==2){
      //Algorithm step 2: Increment color of cell underneath the ant
    grid[x][y]++
    if (grid[x][y]==5) grid[x][y]=0
}else if (algStep==3){
     //Algorithm step 3: move the ant forward
      myAnt.move();
}


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j]==0) fill('black')
      if (grid[i][j]==1) fill('red')
      if (grid[i][j]==2) fill('yellow')
      if (grid[i][j]==3) fill('blue')
      if (grid[i][j]==4) fill('green')
      rect(i*boxW, j*boxW, boxW-1, boxW-1);
    }
  }
//Display cells on the grid 
//Black=0 → Red=1 → Yellow=2 → Blue=3 → Green=4→ Black=0
//LRLRL


myAnt.display();
//displays the ant as a triangle facing appropriate direction
//after displayed cells so that it is on top 

steps++;
//increment step in the cycle 
algStep++;
if (algStep==4) algStep=1;
//increment algorithm step, if it hits 4 cycle it back to step 1

}
