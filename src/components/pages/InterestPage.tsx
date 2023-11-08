
function InterestsPage() {
    return (
        <div className="interests-page">
            <h2>Select Interests</h2>
            <h3>Select at least 3 categories or skip and finish later</h3>
            <div className="interests-grid">
                <label className="interest-checkbox">
                    <input type="checkbox" />
                    <p>Sport</p>
                </label>
            </div>
            <button className="skip-button">Skip</button>
        </div>
    );
}

export default InterestsPage;
