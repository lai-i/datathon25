import { Box } from "@mui/material";
import FailureThreshold from "./failure_threshold";
import FileUpload from "./file_upload";




export default function Inputs() {
    return (
    <Box display={'flex'} width={'inherit'}>
        <FileUpload/>
        <FailureThreshold/>
    </Box>);
}