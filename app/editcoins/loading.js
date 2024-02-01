"use client";
import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full mx-auto">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
}
