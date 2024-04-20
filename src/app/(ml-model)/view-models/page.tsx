"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModelsAndTags = async () => {
      let fetchedModels: Model[] = [];
      const startModelId = 1;
      const endModelId = 10; // Replace with the actual last model ID

      for (let i = startModelId; i <= endModelId; i++) {
        try {
          // Fetch the model
          const modelResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/${i}`
          );
          const modelData: Omit<Model, "Tags"> = await modelResponse.json();

          // Fetch the tags for the model
          const tagsResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/modeltags/${i}`
          );
          const tagsData: Tag[] = await tagsResponse.json();

          // Combine the model data with its tags
          const modelWithTags: Model = { ...modelData, Tags: tagsData };
          fetchedModels.push(modelWithTags);
        } catch (error) {
          console.error(`Error fetching data for model with ID ${i}:`, error);
        }
      }

      setModels(fetchedModels);
    };

    fetchModelsAndTags();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-black">
      {models.map((model) => (
        <div className="w-1/4" key={model.Model_ID}>
          <Card className="rounded-lg overflow-hidden shadow-lg text-white">
            <Image
              src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Model Visual"
              className="w-full h-32 object-cover"
              width={200}
              height={150}
            />
            <CardHeader>
              <CardTitle>{model.Model_Name}</CardTitle>
              <CardDescription>{model.Description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {model.Tags.map((tag) => (
                  <Badge key={tag.TagID} variant="secondary">
                    {tag.Name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{model.Creator_Name}</p>
              <p className="text-xs">{model.Like_Count} likes</p>
              <p className="text-xs">{model.Subscribe_Count} subscribers</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ViewModels;
