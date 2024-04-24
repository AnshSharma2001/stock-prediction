"use client";

import React, { useState, useEffect } from "react";
import { ModelCard } from "./model-card/model-card";
import { Input } from "./ui/input";

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
  imgURL: string;
}

export const AllModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models`)
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models:", error));

    setMounted(true);
  }, []);

  const filteredModels = models.filter((model) =>
    model.Model_Name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center  space-y-20 ">
      <div className="flex flex-col items-center text-center lg:mt-20">
        <div
          className="bg-gradient-to-r from-[blue] to-secondary-foreground text-transparent
        bg-clip-text relative"
        >
          <h1 className=" text-9xl font-bold text-center md:text-[200px]">
            Models
          </h1>
        </div>
        <p className=" text-muted-foreground">
          Browse the best models in our platform, and make your decision wisely.
        </p>
      </div>
      <div className="px-1 w-full sm:w-[90%] mt-10  md:w-2/3 md:mt-10 lg:w-1/2 flex flex-col items-center">
        <Input
          className="sticky sm:w-[90%]  bg-secondary border-none rounded-xl"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div
        className="grid sm:grid-cols-2  w-full md:grid-cols-3
        lg:grid-cols-4 gap-2 sm:px-20 md:px-10  xl:px-32"
      >
        {filteredModels.map((model) => (
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
            imgURL={model.imgURL}
          />
        ))}
      </div>
    </div>
  );
};
