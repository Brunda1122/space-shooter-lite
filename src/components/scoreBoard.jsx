function scoreBoard({score,time}){
    return(
        <div className="Score-board">
            <div>
            <h2>Score</h2>
            <h1>{score}</h1>
            </div>

            <div>
            <h2>Time:60</h2>
            <h1>{time}</h1>
            </div>
        </div>
    );
}

export default scoreBoard;