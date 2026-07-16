function Laser({ shipPosition ,LaserY}) {

    const positions=[
        "15%",
        "50%",
        "85%"
    ];

    return(

        <div
        className="laser"
        style={{
            left:positions[shipPosition],
            bottom:LaserY+"px"
        }}
        >
            🔴
        </div>

    );

}

export default Laser;