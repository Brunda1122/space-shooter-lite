function Spaceship({shipPosition}){

    const positions=[
        '15%',
        '50%',
        '85%',
    ];
    return(
        <div className="spaceship" style={{left:positions[shipPosition]}}>
            🚀

        </div>
    );
}

export default Spaceship;