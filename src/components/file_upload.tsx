'use client'
import { Box, Button, Card, CircularProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
        setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first!");

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        
        try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("File uploaded successfully!");
        } else {
            alert("File upload failed.");
        }
        } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred while uploading the file.");
        } finally {
        setUploading(false);
        }
    };

    return (
        <Card sx={{ width:'fit-content', display: 'flex' }}>
            <Stack spacing={2} alignItems="center" height={'fit-content'} sx={{ px: 4, py: 7, justifySelf: 'center' }}>
            <Typography variant="h6">Upload CSV File</Typography>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
            />
            <label htmlFor="file-input">
                <Button variant="contained" component="span">
                Select File
                </Button>
            </label>

            {file && <Typography variant="body1">{file.name}</Typography>}

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploading || !file}
            >
                {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
            </Stack>
            <Box mx='5px'>
                <Image src='/arm.png' alt='UR3E Robot' width='196' height='262'/>
            </Box>
        </Card>
    );
}