import React from "react";
import { Card, Grid2, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function TrackService() {
  return (
    <div className=" flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
      <Grid2
        container
        className="flex justify-center items-center h-[800px] bg-gray-50 flex-grow overflow-hidden"
      >
        <Grid2 size={{ lg: 6.5, md: 10, xs: 12 }} className="rounded-lg bg-gray-50">
          <Card
            sx={{
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: "#ECECEC"
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
                className="w-96 border  border-gray-400 rounded-lg p-2 "
              />
              <button className="w-28 p-3 text-white font-bold bg-yellow-600 rounded-lg border">
                Submit
              </button>
            </div>
            <div className="h-96 m-5 border rounded-md border-gray-400 flex justify-center items-center bg-white  ">
            </div>
            <div className="w-full flex justify-between p-5">
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
    </div>
  );
}

export default TrackService;
