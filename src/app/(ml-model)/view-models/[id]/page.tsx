"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  Tags: Tag[];
}

interface Tag {
  Model_ID: number;
  Name: string;
  TagID: number;
}

const ModelPage = () => {
  const [model, setModel] = useState<Model | null>(null);
  const pathname = usePathname();
  const modelId = pathname.split("/").pop(); // Assuming the last segment is the ID

  useEffect(() => {
    if (modelId) {
      const fetchModelDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/${modelId}`
          );
          if (!response.ok) throw new Error("Failed to fetch model data");
          const modelData = await response.json();

          const tagsResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/modeltags/${modelId}`
          );
          if (!tagsResponse.ok) throw new Error("Failed to fetch tags data");
          const tagsData: Tag[] = await tagsResponse.json();

          setModel({ ...modelData, Tags: tagsData });
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
        }
      };

      fetchModelDetails();
    }
  }, [modelId]);

  if (!model) {
    return <div>Loading model...</div>;
  }

  // Now you can safely access model properties because model is guaranteed to be non-null
  return (
    <div className="flex flex-col items-center p-4 bg-black">
      <Card className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg text-white">
        {/* ... */}
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
          <div id="comments-section" className="mt-4">
            {/* Comments will go here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelPage;
