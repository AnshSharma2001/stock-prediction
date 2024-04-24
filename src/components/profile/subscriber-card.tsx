import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const SubscriberCard = () => {
  return (
    <Card className="group hover:bg-secondary transition-colors flex flex-col items-center justify-center pt-4">
      <CardContent className="flex aspect-square items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h4 className="text-lg font-semibold group-hover:underline">
              Alicia Chen
            </h4>
            <p className=" text-sm text-muted-foreground">@aliciachen</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" variant="link">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
