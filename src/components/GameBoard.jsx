import Spaceship from "./Spaceship";
import Enemy from "./Enemy";
import Laser from "./Laser";

function GameBoard({shipPosition,enemies,laserVisible}){ 
    return(
        <div className="game-board">

        {
        enemies.map((enemy) => (
            <Enemy
        key={enemy.id}
        lane={enemy.lane}  
        top={enemy.top}
        />
        ))}
        {

        laserVisible && <Laser
        shipPosition={shipPosition}
        />
        }
        
            <Spaceship
            shipPosition={shipPosition}
            
            />
            
        </div>
    );
}
export default GameBoard;