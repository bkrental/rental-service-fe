"use client";
import FullscreenLoading from "@/components/FullscreenLoading";
import OwnerCard from "@/components/OwnerCard/OwnerCard";
import PropertyImage from "@/components/PropertyImage/PropertyImage";
import { useGetPropertyByIdQuery } from "@/redux/features/properties/propertyApi";
import formatAddress from "@/utils/formatAddress";
import goongJs from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css"; // Import GoongJS CSS
import {
  BathtubOutlined,
  BedOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  CropFree,
  FavoriteBorder,
  IosShare,
  MessageOutlined,
  PaidOutlined,
} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Typography } from "@mui/material";
import "@scss/posts.scss";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function PostDetailPage({ params }) {
  // const post = await getPropertyDetail(params.slug);
  const mapRef = useRef(null);
  const { data, error, isLoading } = useGetPropertyByIdQuery(params.slug);
  const post = data?.post;

  const getPostSummary = ({ property_type, address }) => {
    return `${_.capitalize(property_type)} in ${formatAddress(address)}`;
  };

  // Create GoongJS map
  goongJs.accessToken = process.env.NEXT_PUBLIC_GOONG_MAPTILES_KEY;
  useEffect(() => {
    if (post?.location?.coordinates && !mapRef.current) {
      mapRef.current = new goongJs.Map({
        container: "map",
        style: "https://tiles.goong.io/assets/goong_light_v2.json",
        zoom: 20,
        center: post?.location?.coordinates ?? [107.6416527, 11.295036],
      });
    }
  }, [post]);

  const features = [
    {
      label: "Price",
      value: post?.price ? `${post.price} million VND` : "Thoả thuận",
      icon: PaidOutlined,
    },
    {
      label: "Bedroom",
      value: post?.bedrooms || 3 + " Beds",
      icon: BedOutlined,
    },
    {
      label: "Area",
      value: `${post?.area} m²`,
      icon: CropFree,
    },
    {
      label: "Bathroom",
      value: post?.bathrooms || 2 + " Baths",
      icon: BathtubOutlined,
    },
  ];

  if (isLoading) return <FullscreenLoading loading={isLoading} />;

  return (
    <div className="posts_wrapper">
      <div className="posts_container">
        <div className="posts_breadcrumbs">
          <Link href="/rent" className="posts_link">
            <ChevronLeftOutlined sx={{ fontSize: 20 }} />
            Back to Search
          </Link>
        </div>
        <Typography my={1} variant="h4" component="h1">
          {post?.name}
        </Typography>
        <Typography variant="body1" component="h2">
          {formatAddress(post.address)}
        </Typography>

        <div className="posts_gallery">
          <PropertyImage src={post.thumbnail} />
          <PropertyImage src={post.images[0]} />
          <PropertyImage src={post.images[1]} />
          <PropertyImage src={post.images[2]} />
        </div>
        <div className="posts_body">
          {/* LEFT */}
          <div className="posts_left">
            {/* Overview */}
            <div className="posts_info">
              <h4 className="posts_summary">{getPostSummary(post)}</h4>
              <p className="posts_price">{post.price + " triệu/tháng"}</p>
              <div className="posts_actions">
                <div className="posts_action">
                  <IosShare sx={{ fontSize: 20 }} />
                  Share
                </div>
                <div className="posts_action">
                  <FavoriteBorder sx={{ fontSize: 20 }} />
                  Save
                </div>
              </div>
            </div>
            {/* Features */}
            <div className="posts_feature">
              <h4 style={{ fontWeight: 500 }}>Home Highlights</h4>
              <div className="posts_featureList">
                {features.map((feature) => (
                  <div className="posts_featureItem" key={feature.label}>
                    <p className="posts_featureLabel">
                      {feature.icon && <feature.icon sx={{ fontSize: 20 }} />}
                      {feature.label}
                    </p>
                    <p className="posts_featureValue">{feature.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Description */}
            <div className="posts_description">
              <h4>Home Description</h4>
              <p>{post.description}</p>
              <div className="posts_descriptionButton">
                Show more <ChevronRightOutlined />
              </div>
            </div>
            {/* Map */}
            <div className="posts_location">
              <h4>See on map</h4>
              <p>{formatAddress(post.address)}</p>

              <div id="map" style={{ height: "300px", width: "100%" }}></div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="posts_right">
            {/* Owner Card */}
            <div className="posts_card">
              <OwnerCard owner={post.owner} />
              <div className="posts_cardActions">
                <button className="posts_cardButton posts_cardButton--active">
                  <PhoneIcon sx={{ fontSize: 25 }} />
                  {post.contact.phone}
                </button>
                <button className="posts_cardButton">
                  <MessageOutlined sx={{ fontSize: 20 }} />
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
