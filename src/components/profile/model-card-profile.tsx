import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

export const ModelCardProfile = () => {
  return (
    <Card className="group hover:bg-secondary rounded-lg shadow-lg  transition-colors flex flex-col items-center justify-center pt-4">
      <CardContent className="flex aspect-square items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Image
            alt="Model Thumbnail"
            className="rounded-full"
            height={80}
            src="/placeholder.svg"
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width={80}
          />
          <div className="text-center space-y-1">
            <h4 className="text-lg font-semibold group-hover:underline">
              Image Classifier
            </h4>
            <p className=" text-sm text-muted-foreground">
              Classify images with 95% accuracy
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="link">
          View Model
        </Button>
      </CardFooter>
    </Card>
  );
};
