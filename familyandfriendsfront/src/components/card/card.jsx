import "./card.css"
const Card = (props) => {
    return(
        <div className="card">
            <ul>
                <h1>
                    {props.nombre}
                </h1>
                <ul>
                    <li>
                        Valor: 
                    </li>
                    <li>
                        Ultima medicion: 
                    </li>
                </ul>
            </ul>
        </div>
    );
}
export default Card;