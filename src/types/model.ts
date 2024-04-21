// src/types/model.ts

export interface Model {
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
    review_ids: number[];
    Tags: Tag[];
  }
  
  export interface Tag {
    Model_ID: number;
    Name: string;
    TagID: number;
  }
  