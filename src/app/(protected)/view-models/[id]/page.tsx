"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Model, Tag } from '@/types/model'; // '@/' is a common alias to the 'src/' directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GenericModelComponent from "@/components/model/model-page";

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
  return (<GenericModelComponent model={model} />
  );
};

export default ModelPage;
