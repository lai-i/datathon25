import ClientContainer from "@/components/client_container";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ mx: '200px' }}>
      <Header/>
      <ClientContainer/>
      <Footer/>
    </Box>
  );
}
