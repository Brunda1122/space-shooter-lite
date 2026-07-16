function Controls({moveLeft,moveRight,shoot}){
    return(
        <div className="controls">
            <button onClick={moveLeft}>left👈</button>
            <button onClick={shoot}>shoot🔫</button>
            <button onClick={moveRight}>right👉</button>

        </div>
    );
}
export default Controls;