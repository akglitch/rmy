"use client";
import React from "react";
import Dashboard from "./Dashboard";
import { ColorModeProvider } from "@/utils/theme";
import ProtectedRoute from "../ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
<ColorModeProvider>
          <Dashboard />
          </ColorModeProvider>
    </ProtectedRoute>
    
  );
}
