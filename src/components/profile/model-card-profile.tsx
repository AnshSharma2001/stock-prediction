import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

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

interface TruncateText {
  text: string;
  maxLines: number;
  maxChars: number;
}

const truncateText = ({ text, maxLines, maxChars }: TruncateText) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!text) {
      return "";
    }

    if (!divRef.current || !spanRef.current) {
      return;
    }

    const div = divRef.current;
    const span = spanRef.current;

    div.style.display = "inline-block";
    div.style.maxHeight = `${maxLines * 1.2}em`; // Assuming 1.2em line height for the text

    span.textContent = text;

    if (span.offsetHeight > div.offsetHeight || text.length > maxChars) {
      while (span.offsetHeight > div.offsetHeight || text.length > maxChars) {
        text = text.slice(0, -1);
        span.textContent = text + "...";
      }
    }
  }, [text, maxLines, maxChars]);

  return text;
};

export const ModelCardProfile = ({
  Creator_Email,
  Creator_ID,
  Creator_Name,
  Creator_Profile_Picture,
  Description,
  Like_Count,
  Model_File_Path,
  Model_ID,
  Model_Name,
  Subscribe_Count,
  imgURL,
}: Model) => {
  const maxLines = 3; // Maximum number of lines to display
  const maxChars = 100; // Maximum number of characters to display
  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  var text = Description
  

  const truncateText = () => {
    if (!divRef.current || !spanRef.current) {
      return;
    }

    const div = divRef.current;
    const span = spanRef.current;

    div.style.display = "inline-block";
    div.style.maxHeight = `${maxLines * 1.2}em`; // Assuming 1.2em line height for the text

    span.textContent = text;

    if (span.offsetHeight > div.offsetHeight || text.length > maxChars) {
      while (span.offsetHeight > div.offsetHeight || text.length > maxChars) {
        text = text.slice(0, -1);
        span.textContent = text + "...";
      }
    }

    return text;
  };

  useEffect(() => {
    const truncatedText = truncateText();
    // console.log(truncatedText);
  }, []);

  return (
    <Card className="group hover:bg-secondary rounded-lg shadow-lg  transition-colors flex flex-col items-center justify-center pt-4">
      <CardContent className="flex aspect-square items-center justify-center">
        <div className="flex flex-col items-center gap-3 h-4/5">
          <Image
            alt="Model Thumbnail"
            className="rounded-full h-3/5"
            height={80}
            src={imgURL || "/no-image-svgrepo-com.svg"}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width={80}
          />
          <div className="text-center space-y-1">
            <h4 className="text-lg font-semibold group-hover:underline">
              {Model_Name}
            </h4>
            <p className=" text-sm text-muted-foreground">{Description?Description:""}</p>
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
