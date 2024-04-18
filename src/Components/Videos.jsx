import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./"

const Videos = ({ videos, direction }) => {

  if(!videos?.length) return "Loading..."

  return (
    <Stack direction={{md : direction, xs : "row"}} flexWrap="wrap" justifyContent={{ xs : "center", md : "start"}} gap={3}>
        {videos.map((item, idx) => {
            return (
                <Box key={idx} width="300px">
                    {idx === 0  ? <ChannelCard channelDetail={item} /> : <VideoCard video={item} /> }
                </Box>
            )
        })}
    </Stack>
  )
}

export default Videos