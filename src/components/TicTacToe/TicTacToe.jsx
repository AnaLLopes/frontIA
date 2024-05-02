import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_img from "../../assets/Red_circle.png";
import cross_img from "../../assets/Red_X.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let knn = useRef(null);
  let tree = useRef(null);
  let mlp = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];


  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }

    if(count % 2 === 0) 
    {
      e.target.innerHTML = `<img src='${cross_img}'>`;
      data[num] = "x";
      setCount(++count);
    }

    else 
    {
      e.target.innerHTML = `<img src='${circle_img}'>`;
      data[num] = "o";
      setCount(++count);
    }

    const args = data[0]+','+ data[1]+','+ data[2]+','+ data[3]+','+ data[4]+','+ data[5]+','+ data[6]+','+ data[7]+','+ data[8];

    // checkwin();
    
  };

  const {exec} = require('child_process');

  const checkKnn = () => {
    exec('python3 knn.py ${args}', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      let winner = stdout;
      console.log(`stderr: ${stderr}`);
    }
    );
  }

  const checkTree = () => {
    const {exec} = require('child_process');
    exec('python3 tree.py ${args}', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      let winner = stdout;
      console.log(`stderr: ${stderr}`);
    }
    );

  }

  const checkMlp = () => {
    const {exec} = require('child_process');
    exec('python3 mlp.py ${args}', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      let winner = stdout;
      console.log(`stderr: ${stderr}`);
    }
    );
    
  }

  const checkwin = () => {
    if(data[0] === data[1] && data[1] === data[2] && data[2]!== "") {
      won(data[2])
    } else if(data[3] === data[4] && data[4] === data[5] && data[5]!== "") {
      won(data[5])
    } else if(data[6] === data[7] && data[7] === data[8] && data[8]!== "") {
      won(data[8])
    } else if(data[0] === data[3] && data[3] === data[6] && data[6]!== "") {
      won(data[6])
    } else if(data[1] === data[4] && data[4] === data[7] && data[7]!== "") {
      won(data[7])
    } else if(data[2] === data[5] && data[5] === data[8] && data[8]!== "") {
      won(data[8])
    } else if(data[0] === data[4] && data[4] === data[8] && data[8]!== "") {
      won(data[8])
    } else if(data[0] === data[1] && data[1] === data[2] && data[2]!== "") {
      won(data[2])
    } else if(data[2] === data[4] && data[4] === data[6] && data[6]!== "") {
      won(data[6])
    } 
  }

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Winner: <img src=${cross_img}>`;
    } else {
      titleRef.current.innerHTML = `Winner: <img src=${circle_img}>`;
    }
  }

  const wonKnn = (winner) => {
    setLock(true);
    if (winner === "x") {
      knn.current.innerHTML = `Winner: <img src=${cross_img}>`;
    } else if (winner === "o"){
      tree.current.innerHTML = `Winner: <img src=${circle_img}>`;
    } else {
      mlp.current.innerHTML = `Empate`;
    }
  }

  const wonTree = (winner) => {
    if (winner === "x") {
      titleRef.current.innerHTML = `Winner: <img src=${cross_img}>`;
    } else if (winner === "o"){
      titleRef.current.innerHTML = `Winner: <img src=${circle_img}>`;
    } else {
      titleRef.current.innerHTML = `Empate`;
    }
  }

  const wonMlp = (winner) => {
    if (winner === "x") {
      titleRef.current.innerHTML = `Winner: <img src=${cross_img}>`;
    } else if (winner === "o"){
      titleRef.current.innerHTML = `Winner: <img src=${circle_img}>`;
    } else {
      titleRef.current.innerHTML = `Empate`;
    }
  }

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "";
    box_array.map((e) => {
      e.current.innerHTML = "";
    })
  }

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}></h1>
      <div className="board">
        <div className="row0">
          <div className="title" ref={knn} > </div>
          <div className="title" ref={tree}></div>
          <div className="title" ref={mlp} ></div>
        </div>
        <div className="row1">
          <div className="cell" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
          <div className="cell" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
          <div className="cell" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
        </div>
        <div className="row2">
          <div className="cell" ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
          <div className="cell" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
          <div className="cell" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
        </div>
        <div className="row3">
          <div className="cell" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
          <div className="cell" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
          <div className="cell" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
        </div>
      </div>

      <button className="reset" onClick={() =>{reset()}}>Reset</button>
    </div>
  );
};

export default TicTacToe;
