"use client"

import React, { useState, useEffect } from "react";
import { BaseCard } from "./model-card/base-card";
import { ModelCard } from "./model-card/model-card";

// Rest of the code...
interface Model {
Creator_Email: string;
  Creator_ID: number;
  Creator_Name: string;
  Creator_Profile_Picture: string | null;
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Model_Name: string;
  Subscribe_Count: number;
}

export const AllModels = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models`)
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((error) => console.error('Error fetching models:', error));
  }, []);

  return (
    <div
        className="grid grid-cols-2 sm:grid-colds-3 md:grid-cols-4
  lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10"
    >
        {models.map((model) => (
        <ModelCard  
          key={model.Model_ID}
          Creator_Email={model.Creator_Email}
          Creator_ID={model.Creator_ID}
          Creator_Name={model.Creator_Name}
          Creator_Profile_Picture={model.Creator_Profile_Picture}
          Description={model.Description}
          Like_Count={model.Like_Count}
          Model_File_Path={model.Model_File_Path}
          Model_ID={model.Model_ID}
          Model_Name={model.Model_Name}
          Subscribe_Count={model.Subscribe_Count}
        />
      ))}
    </div>
  )
}
