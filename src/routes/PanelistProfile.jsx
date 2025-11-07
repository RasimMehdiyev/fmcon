const panelistProfile = {
    id: 'PNL-20240601',
    expertiseField: 'Artificial Intelligence',
    yearsOfExperience: 8,
    expertiseDescription:
        'Experienced in developing and deploying machine learning models, with a focus on natural language processing and ethical AI practices. Has contributed to multiple industry projects and academic publications.'
};

export default function PanelistProfile() {
    return (
        <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>Panelist Profile</h2>
            <div>
                <strong>Panelist ID:</strong> {panelistProfile.id}
            </div>
            <div>
                <strong>Expertise Field:</strong> {panelistProfile.expertiseField}
            </div>
            <div>
                <strong>Years of Experience:</strong> {panelistProfile.yearsOfExperience}
            </div>
            <div>
                <strong>Expertise Description:</strong>
                <p>{panelistProfile.expertiseDescription}</p>
            </div>
        </div>
    );
}
