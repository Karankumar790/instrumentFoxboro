import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid2,
  Box,
  Paper,
} from "@mui/material";

function Support() {
  const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]); // Default to London coordinates

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          height: "48vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
          <span style={{ color: "#FFB300" }}>Support</span>{" "}
          <span>Us</span>
        </Typography>
        <Typography variant="h6" sx={{ color: "white", marginTop: 2 }}>
          <span style={{ color: "#FFB300" }}>Home →</span>{" "}
          <span>Support Us</span>
        </Typography>
      </Box>

      <Container
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 4,
        }}
      >
        <Box
          sx={{
            height: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
            WORK WITH THE LEADING IOT COMPANY
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "500", color: "white" }}>
            If you are looking to transform the world with IoT, connect with us
            today.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              padding: 4,
              width: "80%",
              borderRadius: "10px",
              backgroundColor: "#111111",
            }}
          >
            <Grid2 container spacing={4} sx={{ width: "100%" }}>
              {/* Contact Form */}
              <Grid2 item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Contact <span style={{ color: "#FFB300" }}>Us</span>
                </Typography>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#202020", marginTop: 2 }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#202020", marginTop: 2 }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#202020", marginTop: 2 }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="Mobile No."
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#202020", marginTop: 2 }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ backgroundColor: "#202020", marginTop: 2 }}
                  InputProps={{ style: { color: "white" } }}
                />
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    width: "100%",
                    backgroundColor: "#FFB300",
                    color: "black",
                    "&:hover": { backgroundColor: "#FF9800" },
                  }}
                >
                  Submit
                </Button>
              </Grid2>

              {/* Map */}
              <Grid2 item xs={12} md={6}>
                <Box
                  sx={{
                    height: "400px",
                    maxWidth: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <MapContainer
                    center={currentPosition}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={currentPosition}>
                      <Popup>You are here!</Popup>
                    </Marker>
                  </MapContainer>
                </Box>

                {/* Contact Info */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ color: "white" }}>
                    Address
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    Contact Us
                  </Typography>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    Working hours
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <LocationOnIcon sx={{ color: "white" }} />
                    <Typography variant="body1" sx={{ color: "white" }}>
                      <span>118, Sumadha Building</span>
                      <br />
                      <span>RDC, Raj Nagar</span>
                      <br />
                      <span>Ghaziabad</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      <CallIcon sx={{ color: "white" }} /> +91 9898029829
                      <br />
                      <EmailIcon sx={{ color: "white" }} /> foxboro@gmail.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <PersonIcon sx={{ color: "white" }} />
                    <Typography variant="body1" sx={{ color: "white" }}>
                      Monday-Saturday: 9:30 AM – 6:30 PM
                      <br />
                      Saturday: Closed at 6:00 PM
                      <br />
                      Sunday: Closed
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default Support;
