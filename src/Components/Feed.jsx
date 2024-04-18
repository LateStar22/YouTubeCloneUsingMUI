import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useEffect, useState } from "react";

const Feed = () => {

    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState([]);

    const handleClick = (categoryName) => {
        setSelectedCategory(categoryName);
    }

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => {
                setVideos(data.items);
            })
            .catch(() => {

            })
    },[selectedCategory])

    return (
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }}} >
            <Box sx={{ height: { xs: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { xs: 0, md: 2 } }} >
                <SideBar handleClick={handleClick} selectedCategory={selectedCategory}></SideBar>
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
                    Developed By Aniket Shukla
                </Typography>
            </Box>
            <Box p={2} sx={{ height: "90vh", flex: "2", overflowY: "auto", ml : {xs : "20px", md : "0px"}}}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
                    {selectedCategory} <span style={{ color: '#fc1503' }}>Videos</span>
                </Typography>
                <Videos videos={videos}></Videos>
            </Box>
        </Stack>
    )
}

export default Feed