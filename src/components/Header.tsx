import { Box, Typography } from "@mui/material";



export default function Header() {
    return (
    <Box>
        <Typography variant="h2" fontWeight={500} fontSize='64' mt='100px'>UR3E Cobots Dashboard</Typography>
        <Typography variant="body2" fontSize='24px' mb='50px'>Team: Silent Disco Stars</Typography>
    </Box>
    );
}