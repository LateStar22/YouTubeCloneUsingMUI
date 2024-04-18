import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Box } from "@mui/material"
import { Videos, ChannelCard } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const ChannelDetail = () => {
  const { channelId } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchFromAPI(`channels?part=snippet&id=${channelId}`).catch(error => {
        console.error(`Error fetching channel data: ${error}`);
        return { items: [] }; // Return a default value to prevent Promise.all from failing
      }),
      fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`).catch(error => {
        console.error(`Error fetching videos data: ${error}`);
        return { items: [] }; // Return a default value to prevent Promise.all from failing
      })
    ]).then(([channelData, videosData]) => {
      setChannelDetail(channelData?.items[0]);
      setVideos(videosData?.items);
    }).catch(error => {
      console.error(`Error in executing Promise.all: ${error}`);
    });
  }, [channelId]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{ background: "linear-gradient(90deg, rgba(3,11,152,1) 0%, rgba(9,103,121,1) 48%, rgba(0,212,255,1) 100%)", height: "300px", zIndex: "10" }}>
        </div>
        {
          channelDetail && (
              <ChannelCard channelDetail={channelDetail} marginTop = "-120px"></ChannelCard>
          )
        }
      </Box>
      <Box display="flex">
        <Box sx={{ m : {sm : "100px"}, paddingLeft : "30px"}}>
            <Videos videos={videos}></Videos>
        </Box>
      </Box>
    </Box>
  )
}

export default ChannelDetail