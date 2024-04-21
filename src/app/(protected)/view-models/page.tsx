// "use client";

// import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { AllModels } from "@/components/all-models";

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
  review_ids: number[];
  Tags: Tag[]; // This is where we store our tags
}

interface Tag {
  Model_ID: number;
  Name: string;
  TagID: number;
}

const ViewModels = () => {
//   const [models, setModels] = useState<Model[]>([]);

//   useEffect(() => {
//     console.log("in use effect"); 
//     const fetchModelsAndTags = async () => {
//       let fetchedModels: Model[] = [];
//       const startModelId = 1;
//       const endModelId = 10; // Replace with the actual last model ID

//       for (let i = startModelId; i <= endModelId; i++) {
//         try {
//           // Fetch the model
//           const modelResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/${i}`
//           );
//           const modelData: Omit<Model, "Tags"> = await modelResponse.json();

//           // Fetch the tags for the model
//           const tagsResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/modeltags/${i}`
//           );
//           const tagsData: Tag[] = await tagsResponse.json();

//           // Combine the model data with its tags
//           const modelWithTags: Model = { ...modelData, Tags: tagsData };
//           fetchedModels.push(modelWithTags);
//         } catch (error) {
//           console.error(`Error fetching data for model with ID ${i}:`, error);
//         }
//       }

//       setModels(fetchedModels);
//     };

//     fetchModelsAndTags();
//   }, []);

  return (
    <div className="w-full">
      <AllModels />
    </div>
  );
};

export default ViewModels;
