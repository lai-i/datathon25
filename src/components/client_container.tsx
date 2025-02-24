'use client'
import { Box, Button, Card, Checkbox, CircularProgress, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

enum viewType {
    NONE = 0,
    SINGLE = 1,
    CONT = 2
};

export default function ClientContainer() {
    // FILE UPLOAD
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [vt, setVT] = useState<viewType>(0);
    const [modelResponse, setModelResponse] = useState<null | number>(null);
    const [checked, setChecked] = useState<boolean>(false);

  const handleCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) setVT(2);
    else setVT(0);
    setInterval(() => {
        fetch("https://datathon25.so-cavalier.com/api/continue")
          .then(response => response.text())
          .then((data) => {
            let res = Number(data);
            if (res === -1) return;
            setModelResponse(res);
            setVT(2);
        })
          .catch(error => console.error("Fetch error:", error));
      }, 500);
  };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLoading(true);
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            
            parseCSV(selectedFile);
        }
    };
    
    const parseCSV = (file: File) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            const jsondf = csvToJson(text);
            setJsonData(jsondf);

            const json = {
                "VALIDATOR" : "10-SEQUENCE",
                "TYPE" : "True",
                "DATAFRAME" : jsondf
            };
            
            console.log("Converted JSON:", json);
    
            // Now that jsonData is updated, send the request
            const res = await fetch("https://datathon25.so-cavalier.com/api/model", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            });
    
            const JSONres = await res.json();
            console.log(JSONres);

            setVT(1);
            setModelResponse(Number(JSONres["RAW-OUTPUT"]));
    
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const csvToJson = (csv: string) => {
        setLoading(true);
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map(header => header.trim());
        const excludeHeaders = new Set(["Num", "Robot_ProtectiveStop", "grip_lost", "cycle"]);
        
        let result: any = {};
        const filteredHeaders = headers.filter(header => !excludeHeaders.has(header));
        
        filteredHeaders.forEach(header => {
            result[header] = [];
        });

        lines.slice(1).forEach(line => {
            const values = line.split(",").map(value => value.trim());
            filteredHeaders.forEach((header, index) => {
                const originalIndex = headers.indexOf(header);
                result[header].push(values[originalIndex] || "");
            });
        });
        
        setLoading(false);

        return result;
    };

    const [value, setValue] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value === "" ? "" : Number(event.target.value);

    // Enforce the range
    if (typeof newValue === "number" && !isNaN(newValue)) {
        if (newValue < 1) newValue = 1;
        if (newValue > 100) newValue = 100;
        setValue(newValue);
    }
    };

    return (
        <Box>
            <Box display='flex'>
                <Card sx={{ width: 'fit-content', display: 'flex' }}>
                    <Stack spacing={2} alignItems="center" height={'fit-content'} sx={{ px: 4, py: 7 }}>
                        <Typography variant="h6">Upload CSV File</Typography>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            disabled={checked}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Button variant="contained" component="span">
                                Select File
                            </Button>
                        </label>

                        {file && <Typography variant="body1">{file.name}</Typography>}
                    </Stack>
                    <Box mx='5px'>
                        <Image src='/arm.png' alt='UR3E Robot' width='196' height='262' />
                    </Box>
                </Card>
                <Card sx={{ mx: '50px', alignContent: 'center', textAlign: 'center', ml: 10, px: 10 }}>
                        <Typography variant="h4">Data Type</Typography>
                        <FormControlLabel
                        control={<Checkbox checked={checked} onChange={handleCChange} />}
                        label={checked ? "Continuous" : "Single"}
                        />
                    </Card>
            </Box>

            <Card sx={{ mt: 3, p: 3 }}>
                <Typography variant="h6">Converted JSON Input (how it is sent to server):</Typography>
                <pre style={{ maxHeight: 300, overflowY: 'auto', background: '#f4f4f4', padding: 10 }}>
                    {loading ? <CircularProgress/> : JSON.stringify(jsonData, null, 2)}
                </pre>
            </Card>
            <Card sx= {{ mt: '20px', p: 10 }}>
                {vt == 1 && !checked ? <Typography variant="h4">Status: {modelResponse ? modelResponse : null}</Typography> : null}
                {vt == 2 && checked ? <Typography variant="h4">Status: {modelResponse ? modelResponse : null}</Typography> : null}
            </Card>
        </Box>
    );
}
