import {TInterest} from "./common/interest.tsx";

type TInterestBlockProps = {
    interest: TInterest;
}

export default function InterestBlock(prop: TInterestBlockProps) {
    console.log(prop.interest)
    return <div className="interest" id={prop.interest.id.toString()}>
        <h2>Select Interests</h2>
        <h3>Select at least 3 categories or skip and finish later</h3>
        <div className="interests-grid">
            <label className="interest-checkbox">
                <input type="checkbox" />
                <p>{prop.interest.name}</p>
            </label>
        </div>
        <button className="skip-button">Skip</button>
    </div>;
}