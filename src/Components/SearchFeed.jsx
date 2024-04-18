import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchFeed = () => {

  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items);
      })
  }, [searchTerm])

  return (
      searchTerm ? (
        <Box p={2} sx={{ height: "90vh", flex: "2", overflowY: "auto", ml: { xs: "20px", md: "100px" } }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
            Search Result for <span style={{ color: '#fc1503' }}>{searchTerm}</span> Videos
          </Typography>
          <Videos videos={videos}></Videos>
        </Box>
      ) : (
        <div>LOADING</div>
      )
  )
}

export default SearchFeed