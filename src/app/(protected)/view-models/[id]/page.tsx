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
import CommentComponent from "@/components/model/model-comments";
// import GenericModelComponent from "@/components/model/model-graph";
import GenericModelComponent from "../model-temp-hard";

const ModelPageTop = () => {
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

return (
    <div>
        <GenericModelComponent model={model || undefined} />
        {/* <GenericModelComponent2 model={model || undefined} /> */}
        <CommentComponent model={model || undefined} />
    </div>
);
};

export default ModelPageTop;
