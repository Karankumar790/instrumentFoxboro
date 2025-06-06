import React from "react";
import PageContainer from "../components/HOC/PageContainer";
import { Card, Grid2, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

function TrackService() {
  return (
    <div className="min-h-screen  flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
      <Header />
      <Grid2
        container
        className="flex justify-center items-center h-[800px] bg-gray-50 flex-grow overflow-hidden"
      >
        <Grid2 size={{ lg: 6 }} className="rounded-lg">
          <Card
            sx={{
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              // backgroundColor: "#ECECEC"
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              className="border bg-green-400 px-5 h-14 p-3"
            >
              Track Service Status (Self Service)
            </Typography>
            <div className=" flex gap-4 p-5 ">
              <input
                type="text"
                size="small"
                placeholder="Enter Service Number"
                className="w-96 border rounded-lg p-2 "
              />
              <button className="w-28 p-3 text-white font-bold bg-yellow-600 rounded-lg border">
                Submit
              </button>
            </div>
            <div className="h-96 flex justify-center items-center bg-gray-100 border rounded-lg border-gray-500 m-2">
              <p className="text-2xl font-bold">Under Development</p>
            </div>
            <div className="w-full flex justify-between p-4">
              <div className="flex gap-3">
                <WarningAmberIcon fontSize="large" className="text-red-700" />
                <p className="text-xl font-semibold">
                  Please Accept / Reschedule Within 24 Hours
                </p>
              </div>
              <button className="bg-orange-600 text-white font-semibold rounded-lg cursor-pointer w-28 p-2">
                Accept
              </button>
            </div>
          </Card>
        </Grid2>
      </Grid2>
      <Footer />
    </div>
  );
}

export default TrackService;
