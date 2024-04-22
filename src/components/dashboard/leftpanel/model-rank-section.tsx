"use client";

import React, { useRef, useState, useEffect } from "react";
import { ModelCategoryCarousel } from "./model-category-carousel";
import { ModelCategoryCarouselLoading } from "./model-category-carousel-loading";

interface Model {
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Name: string;
  Subscribe_Count: number;
  UserID: number;
  Model_Name: string;
  dailyMSE?: number;
  weeklyMSE?: number;
  monthlyMSE?: number;
  yearlyMSE?: number;
  Tags?: string[];
}

type Tag = {
  Model_ID: number;
  Name: string;
};

type ModelCategory = {
  favTech: Model[];
  favFinance: Model[];
  dailyTech: Model[];
  dailyFinance: Model[];
  weeklyTech: Model[];
  weeklyFinance: Model[];
  monthlyTech: Model[];
  monthlyFinance: Model[];
  yearlyTech: Model[];
  yearlyFinance: Model[];
};

const fetchModelTags = async (): Promise<Tag[]> => {
  const mseUrl = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/modeltags`;
  try {
    const response = await fetch(mseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Error fetching model tags: ${error.message}`);
  }
};

const fetchModels = async (): Promise<Model[]> => {
  const mseUrl = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models`;
  try {
    const response = await fetch(mseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

const fetchMseRanking = async (): Promise<{ [key: string]: any }> => {
  const mseUrl = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/average_mse_by_model_and_timeframe`;
  console.log(mseUrl);
  try {
    const response = await fetch(mseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Error fetching MSE ranking: ${error.message}`);
  }
};

const rankModelsByMSE = (
  models: Model[],
  interval: "daily" | "weekly" | "monthly" | "yearly" = "monthly"
): Model[] => {
  const mseProperty = `${interval}MSE` as keyof Model;

  return models
    .slice()
    .sort((a, b) => {
      const mseA = Number(a[mseProperty] ?? Infinity);
      const mseB = Number(b[mseProperty] ?? Infinity);
      return mseA - mseB;
    })
    .slice(0, 5);
};

const filterModelsByTag = (models: Model[], tag: string): Model[] => {
  return models.filter((model) => model.Tags?.includes(tag));
};

const rankModelslikes = (models: Model[]): Model[] => {
  return [...models]
    .sort((a, b) => (b.Like_Count ?? 0) - (a.Like_Count ?? 0))
    .slice(0, 5);
};

export const ModelRankSection: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modelCategories, setModelCategories] = useState<ModelCategory>({
    favTech: [],
    favFinance: [],
    dailyTech: [],
    dailyFinance: [],
    weeklyTech: [],
    weeklyFinance: [],
    monthlyTech: [],
    monthlyFinance: [],
    yearlyTech: [],
    yearlyFinance: [],
  });

  const fetchedOnce = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedModels, fetchedTags, mseData] = await Promise.all([
          fetchModels(),
          fetchModelTags(),
          fetchMseRanking(),
        ]);
        const taggedModels = fetchedModels.map((model) => ({
          ...model,
          Name: model.Model_Name,
          Tags: fetchedTags
            .filter((tag) => tag.Model_ID === model.Model_ID)
            .map((tag) => tag.Name),
          dailyMSE: mseData[model.Model_ID]
            ? mseData[model.Model_ID]["Previous 1 Day"]
            : undefined,
          weeklyMSE: mseData[model.Model_ID]
            ? mseData[model.Model_ID]["Previous Week"]
            : undefined,
          monthlyMSE: mseData[model.Model_ID]
            ? mseData[model.Model_ID]["Previous Month"]
            : undefined,
          yearlyMSE: mseData[model.Model_ID]
            ? mseData[model.Model_ID]["Previous Year"]
            : undefined,
        }));
        setModels(taggedModels);
      } catch (error) {
        console.error("Error fetching models, tags, and MSE data:", error);
      }
    };

    // Used to make sure initial data is collected and this is not ran again
    if (!fetchedOnce.current) {
      fetchInitialData();
      fetchedOnce.current = true;
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // only runs if length of models it already greater than zero to avoid repeat calculations
    if (models.length > 0) {
      setModelCategories({
        favTech: rankModelslikes(filterModelsByTag(models, "Technology")),
        favFinance: rankModelslikes(filterModelsByTag(models, "Finance")),
        dailyTech: rankModelsByMSE(
          filterModelsByTag(models, "Technology"),
          "daily"
        ),
        dailyFinance: rankModelsByMSE(
          filterModelsByTag(models, "Finance"),
          "daily"
        ),
        weeklyTech: rankModelsByMSE(
          filterModelsByTag(models, "Technology"),
          "weekly"
        ),
        weeklyFinance: rankModelsByMSE(
          filterModelsByTag(models, "Finance"),
          "weekly"
        ),
        monthlyTech: rankModelsByMSE(
          filterModelsByTag(models, "Technology"),
          "monthly"
        ),
        monthlyFinance: rankModelsByMSE(
          filterModelsByTag(models, "Finance"),
          "monthly"
        ),
        yearlyTech: rankModelsByMSE(
          filterModelsByTag(models, "Technology"),
          "yearly"
        ),
        yearlyFinance: rankModelsByMSE(
          filterModelsByTag(models, "Finance"),
          "yearly"
        ),
      });
    }
  }, [models]);

  return (
    <div className="pt-8 flex flex-col space-y-20 md:space-y-30 w-full lg:max-w-[70%] mb-10 mx-0">
      {/* <div className="pt-8 grid grid-cols-1 space-y-20 md:space-y-0 gap-10 w-full lg:max-w-[70%] mb-10 mx-auto"> */}
      {isLoading ? (
        <>
          <ModelCategoryCarouselLoading rankingTitle="Users Favorites for Technology" />
          <ModelCategoryCarouselLoading rankingTitle="Users Favorites for Finance" />
          <ModelCategoryCarouselLoading rankingTitle="Daily Best for Technology" />
          <ModelCategoryCarouselLoading rankingTitle="Daily Best for Finance" />
          <ModelCategoryCarouselLoading rankingTitle="Weekly Best for Technology" />
          <ModelCategoryCarouselLoading rankingTitle="Weekly Best for Finance" />
          <ModelCategoryCarouselLoading rankingTitle="Monthly Best for Technology" />
          <ModelCategoryCarouselLoading rankingTitle="Monthly Best for Finance" />
          <ModelCategoryCarouselLoading rankingTitle="Yearly Best for Technology" />
          <ModelCategoryCarouselLoading rankingTitle="Yearly Best for Finance" />
        </>
      ) : (
        <>
          <ModelCategoryCarousel
            rankingTitle="Users Favorites for Technology"
            models={modelCategories.favTech}
          />
          <ModelCategoryCarousel
            rankingTitle="Users Favorites for Finance"
            models={modelCategories.favFinance}
          />
          <ModelCategoryCarousel
            rankingTitle="Daily Best for Technology"
            models={modelCategories.dailyTech}
          />
          <ModelCategoryCarousel
            rankingTitle="Daily Best for Finance"
            models={modelCategories.dailyFinance}
          />
          <ModelCategoryCarousel
            rankingTitle="Weekly Best for Technology"
            models={modelCategories.weeklyTech}
          />
          <ModelCategoryCarousel
            rankingTitle="Weekly Best for Finance"
            models={modelCategories.weeklyFinance}
          />
          <ModelCategoryCarousel
            rankingTitle="Monthly Best for Technology"
            models={modelCategories.monthlyTech}
          />
          <ModelCategoryCarousel
            rankingTitle="Monthly Best for Finance"
            models={modelCategories.monthlyFinance}
          />
          <ModelCategoryCarousel
            rankingTitle="Yearly Best for Technology"
            models={modelCategories.yearlyTech}
          />
          <ModelCategoryCarousel
            rankingTitle="Yearly Best for Finance"
            models={modelCategories.yearlyFinance}
          />
        </>
      )}
    </div>
  );
};
