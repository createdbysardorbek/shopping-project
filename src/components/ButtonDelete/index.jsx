const ButtonDelete = (props) => {
    let {deleteProduct, id} = props
    return (
        <button type="button" onClick={() => deleteProduct(id)}>
            <img src="./img/icons/cross.svg" alt="Delete"/>
        </button>
    );
};

export default ButtonDelete;
