import React, { useEffect, useState } from "react";
import { ModelCardProfile } from "./model-card-profile";
import { getSession } from "next-auth/react";

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

export const LikedModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const getModel = async () => {
    try {
      const session = await getSession();
      const jwtToken = session?.user.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/userlikes`, // Replace with your API URL
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModel();
  }, []);
  return (
    <div>
      {models.length == 0 ? (
        <></>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Liked Models</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {models.map((model) => (
              <ModelCardProfile
                key={model.Model_ID}
                Creator_Email={model.Creator_Email}
                Creator_ID={model.Creator_ID}
                Creator_Name={model.Creator_Name}
                Creator_Profile_Picture={model.Creator_Profile_Picture}
                Description={model.Description}
                Like_Count={model.Like_Count}
                Model_File_Path={model.Model_File_Path}
                Model_ID={model.Model_ID}
                Model_Name={model.Model_Name}
                Subscribe_Count={model.Subscribe_Count}
                imgURL={model.imgURL}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
