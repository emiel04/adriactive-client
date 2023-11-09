import {TInterest} from "./common/interest.tsx";
import Checkbox from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';

type TInterestBlockProps = {
    interest: TInterest;
}

export default function InterestBlock(prop: TInterestBlockProps) {
    console.log(prop.interest)

    return <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 300,
                '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
            }}
        >
        <Sheet variant="outlined">
        <Checkbox overlay label={prop.interest.name}/>
        </Sheet>
        </Box>
    </>;
}



