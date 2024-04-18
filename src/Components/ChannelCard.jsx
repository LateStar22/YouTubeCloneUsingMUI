import React from 'react'
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from 'react-router-dom';

const ChannelCard = ({ channelDetail, marginTop }) => {
    const {
        snippet: {
            title,
            channelTitle,
            channelId
        },
        snippet
    } = channelDetail;
    return (
        <Card sx={{ height: "320px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop, background : "transparent" }}>
            <Link to={`/channel/${channelId}`}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url}
                    alt={channelTitle}
                    sx={{ width: "200px", height: "200px", borderRadius: "50%"}}
                >
                </CardMedia>
            </Link>
            <Typography variant='h6' sx={{ color: "white" }}>
                {channelTitle || title}
                <CheckCircle></CheckCircle>
            </Typography>
            {channelDetail?.statistics?.subscriberCount && (
                <Typography variant='subtitle2' color="white" fontWeight="bold">
                    {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
                </Typography>
            )}
        </Card>
    )
}

export default ChannelCard