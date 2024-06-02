"use client";
import { useCreatePostMutation } from "@/redux/features/createPost/createPostApi";
import {
  setArea,
  setBathrooms,
  setBedrooms,
  setIsStepCompleted,
  setPrice,
  setPriceSuggestion,
} from "@/redux/features/createPostSlice";
import formatVietnamesePrice from "@/utils/formatPrice";
import FullscreenLoading from "@components/FullscreenLoading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { isNumber, debounce } from "lodash";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessDialog from "./SuccessDialog";

export default function PropertyDetailsForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const priceSuggestion = useSelector((s) => s.createPost.priceSuggestion);
  const bedrooms = useSelector((s) => s.createPost.bedrooms);
  const bathrooms = useSelector((s) => s.createPost.bathrooms);
  const area = useSelector((s) => s.createPost.area);
  const createPostData = useSelector((s) => s.createPost);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [price, setPrice] = useState(0);

  const isPriceInputDisabled = area == ("" || "0");

  const handleViewPost = (postId) => {
    router.push(`/posts/${postId}`);
  };

  const fetchPricePrediction = async () => {
    setLoading(true);
    let priceFormData = JSON.stringify({
      province: createPostData?.address?.compound?.province ?? "unknown",
      district: createPostData?.address?.compound?.district ?? "unknown",
      ward: createPostData?.address?.compound?.commune ?? "unknown",
      location_latitude: createPostData?.location[1],
      location_longitude: createPostData?.location[0],
      area: createPostData.area * 1,
    });

    console.log("fetchPricePrediction", priceFormData);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CRAWLER_PRICE_PREDICTION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: priceFormData,
      });
      const data = await response.json();
      const roundedPrice = (Math.round(data.price * 10) / 10) * 1000000;
      setLoading(false);
      dispatch(setPriceSuggestion(roundedPrice));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const debounceFetchPricePrediction = useCallback(debounce(fetchPricePrediction, 1000), [area]);

  const pirceUnit = createPostData.transactionType === "rent" ? "VND (monthly)" : "VND";

  useEffect(() => {
    debounceFetchPricePrediction();
    return () => {
      debounceFetchPricePrediction.cancel();
    };
  }, [area]);

  useEffect(() => {
    const nextEventHandler = async (e) => {
      if (!e.detail.isSubmit) return;

      setLoading(true);
      const createPostPayload = {
        name: createPostData.title,
        description: createPostData.description,
        transaction_type: createPostData.transactionType,
        property_type: createPostData.propertyType,
        price: createPostData.price * 1,
        area: createPostData.area * 1,
        thumbnail: createPostData.images[0].url,
        images: createPostData.images.slice(0).map((image) => image.url),
        address: {
          province: createPostData?.address?.compound?.province ?? "unknown",
          district: createPostData?.address?.compound?.district ?? "unknown",
          ward: createPostData?.address?.compound?.commune ?? "unknown",
          street: createPostData?.address?.street ?? "unknown",
        },
        displayed_address: createPostData?.displayedAddress,
        location: {
          type: "Point",
          coordinates: createPostData?.location,
        },
        bedrooms: createPostData.bedrooms * 1,
        bathrooms: createPostData.bathrooms * 1,
        price: price * 1,
        contact: {
          name: user?.name ?? "Unknown",
          phone: user?.phone ?? "Unknown",
        },
      };

      try {
        const data = await createPost(createPostPayload).unwrap();
        setNewPostId(data?.data?.post?._id);
        setSuccessDialogOpen(true);
        setLoading(false);
        // return router.push("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setIsErrorPopupOpen(true);
        setError(error?.data?.message ?? "Something went wrong");
      }
    };

    window.addEventListener("next", nextEventHandler);

    return () => window.removeEventListener("next", nextEventHandler);
  }, []);

  useEffect(() => {
    if (isNumber(bedrooms * 1) && isNumber(bathrooms * 1) && isNumber(area * 1)) {
      dispatch(setIsStepCompleted(true));
    } else {
      dispatch(setIsStepCompleted(false));
    }
  }, [bedrooms, bathrooms, area]);

  return (
    <Grid container columns={12} rowSpacing={2} columnSpacing={1}>
      <Grid xs={12}>
        <TextField
          onChange={(e) => dispatch(setArea(e.target.value))}
          value={area}
          fullWidth
          id="area"
          label="Property Area"
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          value={bedrooms}
          onChange={(e) => dispatch(setBedrooms(e.target.value))}
          fullWidth
          id="bedrooms"
          label="Bedrooms"
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          value={bathrooms}
          onChange={(e) => dispatch(setBathrooms(e.target.value))}
          fullWidth
          id="bathrooms"
          label="Bathrooms"
        />
      </Grid>

      <Grid xs={12}>
        <Tooltip
          title={
            isPriceInputDisabled
              ? "You must provide the area before entering the property price"
              : "This is a suggested price based on the area and the location of the property. You can change it if you want."
          }
        >
          <TextField
            fullWidth
            disabled={isPriceInputDisabled}
            placeholder={`Suggested price: ${priceSuggestion}`}
            onChange={(e) => setPrice(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="start">{pirceUnit}</InputAdornment>,
            }}
            id="priceRental"
            label="Property Price"
            aria-describedby="price-helper-text"
            value={price}
          />
        </Tooltip>
      </Grid>
      <FullscreenLoading loading={loading} />

      <Dialog open={isErrorPopupOpen} onClose={() => setIsErrorPopupOpen(false)}>
        <DialogTitle>Fail to create the property</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/")}>Back to home</Button>
          <Button variant="contained" onClick={() => setIsErrorPopupOpen(false)} color="primary">
            Try again
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessDialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        onViewPost={() => handleViewPost(newPostId)}
      />
    </Grid>
  );
}
