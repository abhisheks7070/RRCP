import React from 'react'
import { useState, useEffect } from 'react';

const SinglePlayer = () => {



    const [results, setResults] = useState([])
    const [wait, setWait] = useState(false)
    const [pname1, setpname1] = useState("guest")
    const [total, setTotal] = useState(50)
    const [play, setPlay] = useState(false)
    const [show, setShow] = useState(false)
    const [sum, setSum] = useState([0, 0, 0, 0])
    const [newGame, setNewGame] = useState(false)
    const [point, setPoint] = useState([])

    useEffect(() => {
        setSum(handleSum())
    }, [point])

    const handleReset = (event) => {
        event.preventDefault();
        setPoint([])
        setNewGame(false)
        setWait(false)
    }

    const handleClick = async () => {
        setPlay(!play);
        setResults(res);
        setShow(false);
        setWait(true);
    }

    const handlePoint = async (name) => {
        let out = []
        if (name.split("0")[0] != "CHOR") {

            for (let i = 0; i <= 3; i++) {
                if (results[i] == "POLICE005") {
                    out[i] = "CHOR000"
                    continue
                }
                if (results[i] == "CHOR000") {
                    out[i] = "POLICE005"
                    continue
                }
                out[i] = results[i]
            }
        }
        if (name.split("0")[0] == "CHOR") {
            out = results
        }

        let newPoint = {
            Me: out[0].slice(-2),
            Player1: out[1].slice(-2),
            Player2: out[2].slice(-2),
            Player3: out[3].slice(-2),
        }
        setPoint([...point, newPoint])
        setShow(true)

    }


    function handleSum() {
        let temp = [0, 0, 0, 0]
        for (let i = 0; i <= point.length - 1; i++) {
            temp[0] = temp[0] + (+ point[i].Me)
            temp[1] = temp[1] + (+ point[i].Player1)
            temp[2] = temp[2] + (+ point[i].Player2)
            temp[3] = temp[3] + (+ point[i].Player3)
            // console.log(temp)
        }

        return temp
    }

    function handleAuto() {
        let num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        let out = []
        if (num == 1) {

            for (let i = 0; i <= 3; i++) {
                if (results[i] == "POLICE005") {
                    out[i] = "CHOR000"
                    continue
                }
                if (results[i] == "CHOR000") {
                    out[i] = "POLICE005"
                    continue
                }
                out[i] = results[i]
            }
        }
        if (num == 2) {
            out = results
        }

        let newPoint = {
            Me: out[0].slice(-2),
            Player1: out[1].slice(-2),
            Player2: out[2].slice(-2),
            Player3: out[3].slice(-2),
        }
        setPoint([...point, newPoint])
        setShow(true)
    }

    const players = [pname1, 'P1', 'P2', 'P3']

    const arr = ["RAJA010", "RANI005", "CHOR000", "POLICE005"];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let [name, P1, P2, P3] = [...arr]
    let res = [name, P1, P2, P3]

    const Winner = () => {
        let win = []
        for (let i = 0; i <= 3; i++) {
            if (sum[i] >= total) {
                setNewGame(true)
                win.push(players[i])
            }
        }

        return (
            win.map((items) => {
                return (
                    <div className='text-left px-2 text-xl font-bold text-slate-800'>
                        The WINNER is {items}
                    </div>
                     )
            })
        )
    }

    return (
        <div>
            <div className='flex flex-col px-10 py-5'>

                <input className='p-2 w-[80vw] border-solid border-2 border-black' placeholder='Player Name' type="text" value={pname1} onChange={(e) => { setpname1(e.target.value) }} />
                <input className='p-2 w-[80vw] border-solid border-2 border-black' placeholder='Enter maximum points to win' type="text" value={total} onChange={(e) => { setTotal(e.target.value) }} />
                <button className='p-2 mt-1 text-white text-l bg-red-700 w-[30vw] border-solid border-2 border-black' onClick={handleReset}>reset</button>
            </div>
            <div className='flex flex-col md:flex-row  gap-5 justify-around items-center bg-gray-300'>

                <div className='text-xs md:text-base flex bg-green-400 w-[90vw] h-[50vh] md:w-[50vw] md:h-[80vh] relative'>


                    {players.map((player) => {
                        if (player == 'P1') {
                            return <div key={player} className='p-2 border-solid border-2 border-black absolute top-[23vh] left-2  md:top-[38vh] md:left-2'>{player}</div>
                        }
                        if (player == 'P2') {
                            return <div key={player} className='p-2 border-solid border-2 border-black absolute right-[42vw] top-2 md:top-2 md:right-[24vw]'>{player}</div>
                        }
                        if (player == 'P3') {
                            return <div key={player} className='p-2 border-solid border-2 border-black absolute top-[23vh] right-2 md:right-2 md:top-[38vh]'>{player}</div>
                        }
                        else {
                            return <div key={player} className='p-2 border-solid border-2 border-black absolute bottom-2 right-[42vw] md:bottom-2 md:right-[24vw]'>{player}</div>
                        }
                    })}
                    <div className='flex flex-col text-xs md:text-base md:w-[35vw] md:h-[60vh] w-[60vw] h-[30vh] relative m-auto bg-gray-300'>
                        {newGame == false && <button className='p-1 md:px-3 border-solid border-2 border-black mx-auto bg-blue-200 absolute bottom-[12vh] right-[25vw] md:bottom-[24vh] md:right-[15vw]' onClick={handleClick}>
                            PLAY
                        </button>}

                           {(show == false && wait == true && results[0] != "POLICE005") && <div className='p-1 md:px-3 mx-auto absolute bottom-[18vh] right-[25vw] md:bottom-[30vh] md:right-[15vw]'>
                                Wait...
                            </div>}
                           {(show == false && wait == true && results[0] == "POLICE005") && <div className='p-1 md:px-3 mx-auto absolute bottom-[18vh] right-[25vw] md:bottom-[30vh] md:right-[15vw]'>
                                Choose...
                            </div>}
                        {(show == false && results[0] == "POLICE005") && <>{results.map((result, i) => {
                            // console.log(results)

                            if (i == 0) {
                                return <button className='bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute bottom-3 right-[25vw] md:bottom-2 md:right-[16vw]' onClick={() => { handlePoint(result) }} >{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "PAKAD"}</button>
                            }
                            if (i == 1) {
                                return <button className=' bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-[13vh] left-3 md:top-[29vh] md:left-2' onClick={() => { handlePoint(result) }}>{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "PAKAD"}</button>
                            }
                            if (i == 2) {
                                return <button className='bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-3 right-[25vw] md:top-2 md:right-[16vw]' name={result} onClick={() => { handlePoint(result) }}>{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "PAKAD"}</button>
                            }
                            if (i == 3) {
                                return <button className=' bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-[13vh] right-3 md:right-2 md:top-[29vh]' onClick={() => { handlePoint(result) }}>{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "PAKAD"}</button>
                            }
                            })}

                        </>}

                        {(show == false && results[0] != "POLICE005") && <>{results.map((result, i) => {

                            // console.log(results)
                            {
                                setTimeout(handleAuto, 3000)
                            }
                            if (i == 0) {
                                return <button className='bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute bottom-3 right-[25vw] md:bottom-2 md:right-[16vw]'  >{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "????"}</button>
                            }
                            if (i == 1) {
                                return <button className=' bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-[13vh] left-3 md:top-[29vh] md:left-2' >{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "????"}</button>
                            }
                            if (i == 2) {
                                return <button className='bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-3 right-[25vw] md:top-2 md:right-[16vw]' >{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "????"}</button>
                            }
                            if (i == 3) {
                                return <button className=' bg-red-300 p-1 md:p-2 border-solid border-2 border-black absolute top-[13vh] right-3 md:right-2 md:top-[29vh]' >{result.split("0")[0] == "RAJA" || result.split("0")[0] == "POLICE" ? result.split("0")[0] : "????"}</button>
                            }

                        })}
                        </>}
                        {(show == true) && <>{results.map((result, i) => {
                            if (i == 0) {
                                return <button className='bg-red-300 p-2 border-solid border-2 border-black absolute bottom-3 right-[25vw] md:bottom-6 md:right-[16vw]'  >{result.split("0")[0]}</button>
                            }
                            if (i == 1) {
                                return (<button className=' bg-red-300 p-2 border-solid border-2 border-black absolute top-[13vh] left-3 md:top-[29vh] md:left-5' >{result.split("0")[0]}</button>)
                            }
                            if (i == 2) {
                                return <button className='bg-red-300 p-2 border-solid border-2 border-black absolute top-3 right-[25vw] md:top-6 md:right-[16vw]' >{result.split("0")[0]}</button>
                            }
                            if (i == 3) {
                                return (<button className=' bg-red-300 p-2 border-solid border-2 border-black absolute absolute top-[13vh] right-3 md:right-5 md:top-[29vh]' >{result.split("0")[0]}</button>)
                            }
                        })}
                        </>}

                    </div>
                </div>


                <div className='w-[90vw] min-h-[50vh] h-auto md:w-[30vw] md:min-h-[80vh] md:h-auto bg-red-200 flex flex-col justify-start items-center pt-5'>

                    <Winner />

                    <div className='flex gap-5'>
                        <div className='p-1 font-extrabold text-sm md:text-l text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-slate-900 text-white'>{pname1}</div>
                        <div className='p-1 font-extrabold text-sm md:text-l text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-slate-900 text-white'>P1</div>
                        <div className='p-1 font-extrabold text-sm md:text-l text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-slate-900 text-white'>P2</div>
                        <div className='p-1 font-extrabold text-sm md:text-l text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-slate-900 text-white'>P3</div>

                    </div>

                    {point.map((items) => {
                        return (
                            <div className='flex gap-5'>
                                <div className='p-1 text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-blue-400'>{items.Me}</div>
                                <div className='p-1 text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-blue-400'>{items.Player1}</div>
                                <div className='p-1 text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-blue-400'>{items.Player2}</div>
                                <div className='p-1 text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-blue-400'>{items.Player3}</div>

                            </div>
                        )
                    })}
                    <div className='flex gap-5'>
                        {sum.map((items) => {
                            return <div className='p-1 font-extrabold text-xl text-center border-black w-[18vw] md:w-[6vw] mt-2 bg-slate-900 text-white'>{items}</div>
                        })}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SinglePlayer
