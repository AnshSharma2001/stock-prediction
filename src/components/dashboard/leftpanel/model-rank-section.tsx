import { ModelCategoryCarousel } from "./model-category-carousel";

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
    },
    {
      Description: "This is a test for GradientBoosting.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_GradientBoosting.joblib",
      Model_ID: 2,
      Name: "GradientBoosting.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for LGBMRegressor.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_LGBMRegressor.joblib",
      Model_ID: 3,
      Name: "LGBMRegressor.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for RandomForest.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_RandomForest.joblib",
      Model_ID: 4,
      Name: "RandomForest.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for DecisionTree.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_DecisionTree.joblib",
      Model_ID: 5,
      Name: "DecisionTree.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for KNeighbors.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_KNeighbors.joblib",
      Model_ID: 6,
      Name: "KNeighbors.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for LinearRegression.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_LinearRegression.joblib",
      Model_ID: 7,
      Name: "LinearRegression.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test for SVR.joblib",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/1_SVR.joblib",
      Model_ID: 8,
      Name: "SVR.joblib",
      Subscribe_Count: 0,
      UserID: 1,
    },
    {
      Description: "This is a test model for Maulik .",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/7_Mauliks Best Model",
      Model_ID: 10,
      Name: "Mauliks Best Model",
      Subscribe_Count: 0,
      UserID: 7,
    },
    {
      Description: "This is a test model for Maulik .",
      Like_Count: 0,
      Model_File_Path: "/home/ec2-user/stock_models/7_Mauliks Best Model",
      Model_ID: 11,
      Name: "Mauliks Best Model",
      Subscribe_Count: 0,
      UserID: 7,
    },
  ],
};

export const ModelRankSection = () => {
  // TODO: Ideally would map over here as well.
  const { models } = sampleDataFromAPI;
  return (
    <div className="pt-8 grid grid-cols-1 space-y-20 w-full mb-10">
      <ModelCategoryCarousel rankingTitle="Trending in Tech" models={models} />
      <ModelCategoryCarousel
        rankingTitle="Trending in Finance"
        models={models}
      />
      <ModelCategoryCarousel
        rankingTitle="High risk, high reward"
        models={models}
      />
      <ModelCategoryCarousel rankingTitle="Slow and Steady" models={models} />
      <ModelCategoryCarousel
        rankingTitle="Trending in Commodity"
        models={models}
      />
      <ModelCategoryCarousel rankingTitle="Trending in Tech" models={models} />
    </div>
  );
};
