"use client";

import React, { useState, useTransition, useEffect } from "react";
import { ModelCategoryCarousel } from "./model-category-carousel";
import fetch from 'node-fetch';

const sampleDataFromAPI = {
  models: [
    {
      Description: "This is a test for AdaBoost.joblib",
      Like_Count: 1,
      Model_File_Path: "/home/ec2-user/stock_models/1_AdaBoost.joblib",
      Model_ID: 1,
      Name: "AdaBoost.joblib",
      Subscribe_Count: 1,
      UserID: 1,
      Tags: [1,2]
    },
    {
      Description: "This is a test for GradientBoosting.joblib",
      Like_Count: 8,
      Model_File_Path: "/home/ec2-user/stock_models/1_GradientBoosting.joblib",
      Model_ID: 2,
      Name: "GradientBoosting.joblib",
      Subscribe_Count: 8,
      UserID: 1,
      Tags: [1,2]
    },
    {
      Description: "This is a test for LGBMRegressor.joblib",
      Like_Count: 4,
      Model_File_Path: "/home/ec2-user/stock_models/1_LGBMRegressor.joblib",
      Model_ID: 3,
      Name: "LGBMRegressor.joblib",
      Subscribe_Count: 4,
      UserID: 1,
      Tags: [1,2]
    },
    {
      Description: "This is a test for RandomForest.joblib",
      Like_Count: 2,
      Model_File_Path: "/home/ec2-user/stock_models/1_RandomForest.joblib",
      Model_ID: 4,
      Name: "RandomForest.joblib",
      Subscribe_Count: 2,
      UserID: 1,
      Tags: [1,2]
    },
    {
      Description: "This is a test for DecisionTree.joblib",
      Like_Count: 9,
      Model_File_Path: "/home/ec2-user/stock_models/1_DecisionTree.joblib",
      Model_ID: 5,
      Name: "DecisionTree.joblib",
      Subscribe_Count: 9,
      UserID: 1,
      Tags: [1,2,3]
    },
    {
      Description: "This is a test for KNeighbors.joblib",
      Like_Count: 25,
      Model_File_Path: "/home/ec2-user/stock_models/1_KNeighbors.joblib",
      Model_ID: 6,
      Name: "KNeighbors.joblib",
      Subscribe_Count: 25,
      UserID: 1,
      Tags: [2,3]
    },
    {
      Description: "This is a test for LinearRegression.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_LinearRegression.joblib",
      Model_ID: 7,
      Name: "LinearRegression.joblib",
      Subscribe_Count: 0,
      UserID: 1,
      Tags: [3]
    },
    {
      Description: "This is a test for SVR.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_SVR.joblib",
      Model_ID: 8,
      Name: "SVR.joblib",
      Subscribe_Count: 0,
      UserID: 1,
      Tags: [3]
    },
  ],
};


const fetchMseRanking = async () => {
  const mseUrl = 'http://3.129.67.70/general/models/average_mse_by_model_and_timeframe';
  const response = await fetch(mseUrl);
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const ModelRankSection = () => {
  const [models, setModels] = useState(sampleDataFromAPI.models);
  const [modelCategories, setModelCategories] = useState({
      favTech: [],
      favFinance: [],
      favHealthcare: [],
      bestTech: [],
      bestFinance: [],
      bestHealthcare: []
  });

  useEffect(() => {
      fetchMseRanking().then(data => {
          const updatedModels = models.map(model => {
              const mseData = data[model.Model_ID];
              return { ...model, monthlyMSE: mseData ? mseData["Previous Month"] : null };
          });
          setModels(updatedModels);
      }).catch(error => console.error("Error fetching MSE Ranking:", error));
  }, []);

  useEffect(() => {
      // Logic that depends on updated models
      setModelCategories({
          favTech: rankModelslikes(filterModelsByTag(models, 1)),
          favFinance: rankModelslikes(filterModelsByTag(models, 2)),
          favHealthcare: rankModelslikes(filterModelsByTag(models, 3)),
          bestTech: rankModelsByMSE(filterModelsByTag(models, 1)),
          bestFinance: rankModelsByMSE(filterModelsByTag(models, 2)),
          bestHealthcare: rankModelsByMSE(filterModelsByTag(models, 3))
      });
  }, [models]);

  const rankModelsByMSE = (models) => {
      return [...models].sort((a, b) => a.monthlyMSE - b.monthlyMSE).slice(0, 10);;
  };

  const filterModelsByTag = (models, tag) => {
      return models.filter(model => model.Tags.includes(tag));
  };

  const rankModelslikes = (models) => {
      return [...models].sort((a, b) => b.Like_Count - a.Like_Count).slice(0, 10);;
  };

  return (
      <div className="pt-8 grid grid-cols-1 space-y-20 w-full mb-10">
          <ModelCategoryCarousel rankingTitle="Favorites in Tech" models={modelCategories.favTech} />
          <ModelCategoryCarousel rankingTitle="Favorites in Finance" models={modelCategories.favFinance} />
          <ModelCategoryCarousel rankingTitle="Favorites in Health Care" models={modelCategories.favHealthcare} />
          <ModelCategoryCarousel rankingTitle="Best Monthly for Tech" models={modelCategories.bestTech} />
          <ModelCategoryCarousel rankingTitle="Best Monthly for Finance" models={modelCategories.bestFinance} />
          <ModelCategoryCarousel rankingTitle="Best Monthly for Health Care" models={modelCategories.bestHealthcare} />
      </div>
  );
};