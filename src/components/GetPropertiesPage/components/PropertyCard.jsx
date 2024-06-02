import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useAddToFavouriteMutation, useRemoveFromFavouriteMutation } from "@/redux/features/properties/propertyApi";
import { CropFreeOutlined, FavoriteOutlined, GradeOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import SingleBedOutlinedIcon from "@mui/icons-material/SingleBedOutlined";
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, IconButton, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { deepOrange, orange } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const lineTruncate = (line = 1) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: `${line}`,
  WebkitBoxOrient: "vertical",
});

export default function PropertyCard({
  property: {
    _id,
    address,
    name,
    description,
    price,
    area,
    thumbnail,
    owner,
    bedrooms,
    bathrooms,
    property_type,
    isFavourite,
  },
}) {
  bedrooms = 1;
  bathrooms = 1;
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  const formatAddress = ({ street, district, province }) => {
    return `${street}, ${district}, ${province}`;
  };

  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const [addToFavourite] = useAddToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();

  const toggleFavourite = async () => {
    if (!isAuthenticated) return alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    const before = isFavouriteState;
    try {
      setIsFavouriteState((prev) => !prev);
      if (!isFavouriteState) {
        await addToFavourite(_id).unwrap();
      } else {
        await removeFromFavourite(_id).unwrap();
      }
      const event = new Event("favourite-post-updated", { detail: { postId: _id, isFavourite: !before } });
      window.dispatchEvent(event);
    } catch (error) {
      console.error(error);
      setIsFavouriteState(before);
    }
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 390 }} key={_id}>
      <CardMedia sx={{ width: "100%", height: 230, objectFit: "contain" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image src={thumbnail} layout="fill" objectFit="cover" />
        </div>
      </CardMedia>
      {/* <CardMedia image={thumbnail} sx={{ width: "100%", height: 230, objectFit: "contain" }} title={name} /> */}
      <CardContent>
        <Box display="flex" mb={1} gap={1}>
          <Chip size="small" icon={<GradeOutlined />} label="Tin mới" color="blue" />
          <Chip size="small" label={PROPERTY_TYPES[property_type].viLabel} />
        </Box>
        <Typography
          variant="h4"
          component={Link}
          href={`/posts/${_id}`}
          gutterBottom
          sx={{
            fontSize: "1rem",
            lineHeight: 1.25,
            fontWeight: 600,
            textDecoration: "none",
            color: "text.primary",
            textWrap: "stable",
            ...lineTruncate(1),
          }}
        >
          {formatAddress(address)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1.25rem" }} color="primary" gutterBottom>
          {price + " triệu/tháng"}
        </Typography>
        <Box display="flex" alignItems="center" gap={3} mb={1}>
          <Box display="flex" alignItems="center">
            <SingleBedOutlinedIcon sx={{ fontSize: 20, marginRight: 0.5 }} />
            <Typography variant="body1">{`${bedrooms} pn`}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <ShowerOutlinedIcon sx={{ fontSize: 20, marginRight: 0.5 }} />
            <Typography variant="body1">{`${bathrooms} wc`}</Typography>
          </Box>
          {area && (
            <Box display="flex" alignItems="center">
              <CropFreeOutlined sx={{ fontSize: 20, marginRight: 0.5 }} />
              <Typography variant="body1">
                {area + "m"}
                <sup>2</sup>
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant="body2" paragraph sx={{ ...lineTruncate(2) }}>
          {description}
        </Typography>
      </CardContent>
      <Divider />
      <CardHeader
        sx={{ paddingX: 2, paddingY: 1 }}
        avatar={
          <Avatar
            sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}
            aria-label={owner?.name || "Ẩn danh"}
            alt={owner?.name || "Ẩn danh"}
            src={owner?.avatar}
          />
        }
        action={
          <IconButton size="large" aria-label="add to favorites" onClick={toggleFavourite}>
            {isFavouriteState ? (
              <FavoriteOutlined fontSize="40" sx={{ color: orange[800] }} />
            ) : (
              <FavoriteBorderIcon fontSize="40" />
            )}
            {/* <FavoriteBorderIcon /> */}
          </IconButton>
        }
        title={owner?.name || "Ẩn danh"}
        subheader="Đăng hôm nay"
      />
    </Card>
  );
}
