
const Rank = ({name, entries}) => {
    return(
        <div>
            <div className="rank white f3">
                { `Hello ${name}, Counting image detection ...  `}
            </div>
            <div className="rank white f3">
                {entries}
            </div>
        </div>
    );
}

export default Rank;