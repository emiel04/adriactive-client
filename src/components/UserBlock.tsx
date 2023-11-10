import {TUser} from "./common/user.tsx";

type TUserBlockProps = {
    user: TUser;
}

export default function UserBlock(prop: TUserBlockProps) {
    console.log(prop.user)

    return <div className="user">
        <p>{prop.user.firstName}</p><p>{prop.user.lastName}</p>
        <textarea value={prop.user.aboutMe}></textarea>
    </div>;
}