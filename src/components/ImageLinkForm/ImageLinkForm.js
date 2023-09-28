import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {  //{onInputChange} is props.onInputChange
    return (
        <div className="">
            <p className="f3">
                {'This will detect faces in the uploded image.'}
            </p>

            <div className="w-80 center form shadow-5">
                <div className="pa4 br3 shadow-3">
                    <input className="f4 pa2 w-70 " type="text" onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;