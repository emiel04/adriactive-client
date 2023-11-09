import {TInterest} from "./common/interest.tsx";

type TInterestBlockProps = {
    interest: TInterest;
}

export default function InterestBlock(prop: TInterestBlockProps) {
    console.log(prop.interest)

    return <label className="interest-checkbox">
            <input type="checkbox" />
            <p>{prop.interest.name}</p>
        </label>;
}