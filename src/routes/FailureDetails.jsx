import { createSignal } from "solid-js";
const FailureDetails = () => {
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
            <h2>Failure Details</h2>
            <form>
                <div className="input-group">
                    <label htmlFor="failureTitle">Failure Title:</label>
                    <input
                        type="text"
                        id="failureTitle"
                        name="failureTitle"
                        value={formData.failureTitle}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default FailureDetails;