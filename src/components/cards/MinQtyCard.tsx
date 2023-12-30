interface ProductProps {
    image: string,
    name: string,
    description: string
}

function MinQtyCard(props: ProductProps) {
    const cardWidthStyle: React.CSSProperties = {
        width: '100%',
        marginBottom: '15px'
    }
    return (
        <div className="card" style={cardWidthStyle}>
            <img src={props.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default MinQtyCard