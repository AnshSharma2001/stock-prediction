"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tags } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(Infinity),
  tagID: z.array(z.number().min(1)),
  modelFile: z.instanceof(File).optional(),
});

const useJWT = () => {
  const [JwtId, setJwtId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log(session?.user.accessToken)
      if (session?.user.accessToken) {
        setJwtId(session.user.accessToken)
      }
    };

    fetchSession();
  }, []);

  return JwtId;
};

const CreateModel = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const JwtId = useJWT(); // Move the useJWT hook here.
  
  const router = useRouter(); 
  const tags = [
    { id: 1, label: "Finance" },
    { id: 2, label: "Technology" },
    { id: 3, label: "Services"}
  ]
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tagID: [],
      modelFile: undefined,
    },
  });
  const {register, handleSubmit, setValue, watch } = form

  const submitModel = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name)
    formData.append("description", values.description)
    values.tagID.forEach(tag => formData.append("tags", String(tag)))

    if (file) {
      formData.append("model_file", file)
    }

    // Here you would make your API request
    console.log("Form Data Prepared:", Object.fromEntries(formData));
    const SendForm = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/model/add`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${JwtId}`,
          },
          body: formData,
        })
  
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("Success:", jsonResponse);
          router.replace("/view-models"); 
          return jsonResponse;
        } else {
          throw new Error("Failed to submit model");
        }
      } catch (error) {
        console.error("Error:", error);
      };
    }
    SendForm();
  }

  const handleTagSelection = (tagLabel: any) => {
    console.log(tagLabel)
    const selectedTagIds = []
    for (const tag of tags) {
      if (tag.label === tagLabel) {
        selectedTagIds.push(tag.id)
        setValue('tagID', selectedTagIds);
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file)
    } // You can use this state to show file information or for form submission
    else {
      setFile(undefined);
    }
  };

  

  return (
    <div className="h-full p-8">
      <Card className="h-full p-8">
        <h2 className="text-3xl font-bold mb-4">Model Submission</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(submitModel)} className="space-y-4">
            <FormItem className="flex flex-col">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="rounded-md p-2" placeholder="Enter model name" {...register("name")} />
              </FormControl>
            </FormItem>
            <FormItem className="flex flex-col">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your description here" {...register("description")}/>
              </FormControl>
            </FormItem>
            <FormItem>
              <Select onValueChange={(value: any) => handleTagSelection(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                      {tags.map(tag => (
                        <SelectItem key={tag.id} value={tag.label}>{tag.label}</SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture" className="flex items-center gap-2">
                Upload <Tags /> File extension: .joblib
              </Label>
              <Input id="picture" type="file" onChange={handleFileChange}/>
            </div>

            <Button type="submit" className="rounded-md py-2">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateModel;
