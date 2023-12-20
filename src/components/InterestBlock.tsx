import {TInterest} from "./common/interest.tsx";
import Checkbox from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';

type TInterestBlockProps = {
    interest: TInterest;
    onChange: () => void;
    isSelected: boolean;
}

export default function InterestBlock({interest, onChange, isSelected}: TInterestBlockProps) {

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
        <Checkbox overlay label={interest.name} onChange={onChange} checked={isSelected}/>
        </Sheet>
        </Box>
    </>;
}



