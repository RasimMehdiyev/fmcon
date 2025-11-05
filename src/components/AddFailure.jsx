import { createSignal } from "solid-js";

const AddFailure = () => {
    const [formData, setFormData] = createSignal({
        failureTitle: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="failure-details">
            <h2>Add new failure</h2>
            <form>
                <div className="input-group">
                    <label htmlFor="failureType">What type of failure would you like to add ?</label>
                    <input
                        type="radio"
                        id="failureType"  
                        name="failureType"
                        value={formData.failureTitle}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default FailureDetails;