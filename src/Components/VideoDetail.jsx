import { useParams, Link } from 'react-router-dom'
import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import ReactPlayer from 'react-player'
import { Videos } from './'
import { CheckCircle } from '@mui/icons-material'

const VideoDetail = () => {

  const { videoId } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
      .then((data) => {
        setVideoDetail(data.items[0])
      })

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${videoId}`)
      .then((data) => {
        setVideos(data.items)
      })
  }, [videoId])

  if (!videoDetail?.snippet) return "Loading..."

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position : "sticky", top : "80px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} height="500px" width = "100%" controls></ReactPlayer>
            <Typography color="#fff" variant='h5' fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff", }} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm : "subtitle1", md : "h6"}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{fontSize : "12px", color : "gray", ml : "5px"}}></CheckCircle>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant='body1' sx={{ opacity : 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant='body1' sx={{ opacity : 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2}>
            <Videos videos={videos} direction="column" ></Videos>
        </Box>  
      </Stack>
    </Box>
  )
}

export default VideoDetail