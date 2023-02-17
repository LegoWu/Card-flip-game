import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import check from './images/tick-icon.png'
import img1 from './images/img01.jpg';
import img2 from './images/img02.jpg';
import img3 from './images/img03.jpg';
import img4 from './images/img04.jpg';
import img5 from './images/img05.jpg';
import img6 from './images/img06.jpg';
import img7 from './images/img07.jpg';
import img8 from './images/img08.jpg';

const imgPool =  [img1, img2, img3, img4, img5, img6, img7, img8];
let list =  [img1, img2, img3, img4, img1, img2, img3, img4];

const FlipCard = () => {
    const [active, setActive] = useState(false);
    const [delaySeconds, setDelaySeconds] = useState(3);
    const [delay, setDelay] = useState(0);
    const [cardNum, setCardNum] = useState(8);
    let currentAnswer = "";
    let prevTarget, currentTarget;

    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(delay - 1);
        }, 1000);
    
        if (delay === 0) {
            clearInterval(timer);
        }
    
        return () => {
            clearInterval(timer);
        };
    });
    
    const checkAnswer = (item) => (event) => {
        currentTarget = event.currentTarget;
        // console.log(list[item.id]);
        if (currentTarget.classList.contains('success') || prevTarget === currentTarget) {
            event.preventDefault();
            return;
        }

        currentTarget.classList.toggle('flip');
        if (currentAnswer === "") {
            // Keep the firstly flip card
            currentAnswer = list[item.id];
            prevTarget = currentTarget;
            // console.log("new! ans: " + currentAnswer);
        } else {
            if (list[item.id] === currentAnswer) {
                // console.log("correct");
                setTimeout( () => {
                    currentTarget.classList.add('success');
                    prevTarget.classList.add('success');
                    prevTarget = null;
                }, 1000 );
            } else {
                // console.log("wrong");
                setTimeout( () => {
                    currentTarget.classList.toggle('flip');
                    prevTarget.classList.toggle('flip');
                    prevTarget = null;
                }, 1000 );
            }
            // console.log("ans: " + currentAnswer);
            // Clear currentAnswer for either correct match or wrong match
            currentAnswer = "";
        }
    }
    
    const Card = (props) => {
        const { id, imageSrc } = props;  
        return (
            <div onClick={ checkAnswer({id}) } className="max-w-xs h-28 lg:h-40 2xl:h-52 cursor-pointer rounded bg-sky-600 hover:bg-sky-500 flex card relative">
                <div className="card-side card-back grid rounded lg:shadow-xl">
                    <img src={imageSrc} className="fixed w-full h-full" alt={`Card number${id}`} />
                    <img src={check} className="check-icon fixed w-full h-full p-4 md:p-10 opacity-80" alt="" />
                </div> 
                <div className="card-side card-front grid rounded lg:shadow-xl">
                    <img src={logo} className="h-12 md:h-16 lg:h-20 m-auto" alt="logo" />
                    <h4 className='text-gray-100'>CLICK</h4>
                </div>
            </div>
        );
    };

    const initCard = () => {
        list = [];
        for(let i = 0; i <= cardNum/2-1; i ++) {
            // push two images as a set
            list.push(imgPool[i]);
            list.push(imgPool[i]);
        }
        // shuffle the image sets
        list = list.sort( () => Math.random() - 0.5 );
        setDelay(delaySeconds);
        setActive(true);
        setTimeout( () => {
            // reset all params
            setActive(false);
            setDelay(0);
            currentAnswer = "";
        }, (delaySeconds)*1000 );
    }

    const StartButton = () => {
        return (
            <button className='h-10 px-4 m-4 lg:w-1/5 w-1/2 bg-sky-800 hover:bg-sky-600 text-white rounded-full' onClick={initCard}>CLICK TO START</button>
        );
    }

    const Countdown = () => {
        return (
            <h1 className={`text-3xl font-bold ${!active ? "hidden" : ""}`}>{delay}</h1>
        );
    }

    const CardNumSelect = () => {
        return (
            <select
                id="setNum"
                onChange={ e=>{setCardNum(e.target.value)} }
                value={cardNum}
            >
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
            </select>
        );
    }

    const DelaySelect = () => {
        return (
            <select
                id="DelaySelect"
                onChange={ e=>{setDelaySeconds(e.target.value)} }
                value={delaySeconds}
            >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
            </select>
        );
    }

    return (
        <div className={`flip-card ${active ? "flip" : ""}`}>
            <span className='mx-2'>Card numbers:<CardNumSelect /></span>
            <span className='mx-2'>Delay seconds:<DelaySelect /></span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 m-4">
                {list.map((item, index) => (
                    <Card id={index} key={index} imageSrc={item} />
                ))}
            </div>
            <StartButton />
            <Countdown />
        </div>
    );
  }
  
  export default FlipCard;
  