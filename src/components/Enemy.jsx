function Enemy({lane,top}){
    const positions=['15%','50%','85%'];
    return(
        <div className="enemy"
        style={{left:positions[lane],
            top:top+"px"
        }}>
        🦠
        </div>
    );
}
export default Enemy;
