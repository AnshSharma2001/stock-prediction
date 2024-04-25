import React, { useState, useEffect } from "react";
import styles from './ModelPage.module.css';
import { Button } from "@/components/ui/button";
import { ResponsiveLine } from "@nivo/line";
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import { ArrowBigUp } from 'lucide-react';
import { getSession } from 'next-auth/react';
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface CommentType {
  id: number;
  text: string;
  voteCount: number;
  userId: number;
  userName: string;
  userProfilePic?: string;
  isUserAuthor: boolean; 
  isUpvoted: boolean
}

interface ModelType {
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

interface Tag {
  Model_ID: number;
  Name: string;
  TagID: number;
}

interface CurvedlineChartProps {
  className?: string;
  data: {
    id: string;
    data: { x: string; y: number }[];
  }[];
}


interface UserDetails {
  jwtToken: string | null;
  userId: number | null;
}

const defaultProfilePic = "https://avatars.githubusercontent.com/u/124599?v=4";


const defaultModel: ModelType = {
  Creator_Email: "default@example.com",
  Creator_ID: 0,
  Creator_Name: "Default Creator",
  Creator_Profile_Picture: null,
  Description: "This is a default description for the model.",
  Like_Count: 0,
  Model_File_Path: "",
  Model_ID: 0,
  Model_Name: "Default Model",
  Subscribe_Count: 0,
  review_ids: [],
  Tags: [{ Model_ID: 0, Name: "Default Tag", TagID: 0 }],
};

const defaultChartData = [
  {
    id: "default",
    data: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 15 },
      { x: "Apr", y: 37 },
      { x: "May", y: 48 },
      { x: "Jun", y: 53 },
    ],
  },
];

const useUserDetails = () => {
  const [details, setDetails] = useState<UserDetails>({
    jwtToken: null,
    userId: null
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const session = await getSession();
      if (session?.user?.accessToken) {
        const jwtToken = session.user.accessToken;
        const url = 'https://techblacker.com/protected';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDetails({
            jwtToken,
            userId: data.user_id // Ensure your backend sends this exact key
          });
        } else {
          console.error("Failed to fetch user ID:", response.statusText);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return details;
};


const Comment: React.FC<{ comment: CommentType, onDelete: (commentId: number) => void }> = ({ comment, onDelete }) => {
  const [voteCount, setVoteCount] = useState(comment.voteCount);
  const [isUpvoted, setIsUpvoted] = useState(comment.isUpvoted);  // This state will be toggled based on the response
  const { jwtToken,userId } = useUserDetails(); // Assuming this hook provides the JWT token
  const [reviews, setReviews] = useState<CommentType[]>([]);

  // A function to toggle the upvote status
  const handleUpvote = async () => {
  
    if (!jwtToken) {
      console.error("JWT token is not available");
      alert("You must be logged in to vote.");
      return;
    }
  
    // Toggle upvote state optimistically
    const newIsUpvoted = !isUpvoted;
    const newVoteCount = isUpvoted ? voteCount - 1 : voteCount + 1;

    setIsUpvoted(newIsUpvoted);
    setVoteCount(newVoteCount);
  
    try {
      const response = await fetch(`https://techblacker.com/review/toggle_upvote/${comment.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Revert if the server responds with an error
        alert(`Failed to toggle upvote: ${data.message || response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error while toggling the upvote:", error);
      alert("An error occurred while toggling the upvote.");
      // Revert the optimistic UI update on error
    }
  };


  const handleDelete = async () => {
    if (!jwtToken) {
      alert("You must be logged in to delete comments.");
      return;
    }
  
    try {
      const response = await fetch(`https://techblacker.com/review/delete_review/${comment.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to delete comment: ${errorData.message}`);
        return;
      }
      onDelete(comment.id);
  
      // Remove the deleted comment from the reviews array
    } catch (error) {
      console.error("Error deleting the comment:", error);
      alert("An error occurred while deleting the comment.");
    }
  };

  return (
    <div className={styles.commentBox}>
      <div className={styles.userInfo}>
        {/* <Image src={comment.userProfilePic || defaultProfilePic} alt={`${comment.userName}'s profile`} width={50} height={50} /> */}
        <Avatar>
          <AvatarImage src={comment.userProfilePic}/>
          <AvatarFallback>
            {comment.userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className={styles.userName}>{comment.userName}</div>
      </div>
      <div className={styles.content}>{comment.text}</div>
      <div className={styles.voteContainer}>
        <button className={styles.voteButton} onClick={handleUpvote} disabled={!jwtToken}>
          <ArrowBigUp fill={isUpvoted ? '#2563eb' : 'none'} color={'#2563eb'} size="35" />
        </button>
        <span className={styles.voteCount}>{voteCount}</span>
        {userId === comment.userId && (
          <button className={styles.deleteButton} onClick={handleDelete} title="Delete comment">
            X
          </button>
        )}
      </div>
    </div>
  );
};

const GenericModelComponent: React.FC<{ model?: ModelType }> = ({
  model = defaultModel,
}) => {
  const [newComment, setNewComment] = useState('');
  const [reviews, setReviews] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { jwtToken, userId } = useUserDetails();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter was pressed without Shift
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action to avoid a newline in textarea
      if (newComment.trim()) {
        handleCommentSubmit(event as unknown as { preventDefault: () => void }); // Simulate form submit
      }
    }
  };

  // Function to fetch reviews
  const fetchReviews = async () => {
    if (userId) {
      setLoading(true);
      try {
        const response = await fetch(`https://techblacker.com/general/models/${model.Model_ID}/reviews`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedReviews = data.map((item: any) => ({

          id: item.Review_ID,
          text: item.Comment,
          voteCount: item.Upvote,
          userId: item.Reviewer_ID,
          userName: item.Reviewer_Name,
          userProfilePic: item.Reviewer_Profile_Pic,
          isUpvoted: item.Upvoter_IDs?.split(', ').includes(userId.toString())
        })).sort((a: CommentType, b: CommentType) => b.voteCount - a.voteCount); // Sorting by vote count in descending order
  
        setReviews(sortedReviews);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };



  // Initial fetch of reviews
  useEffect(() => {
    fetchReviews();
  }, [userId, model.Model_ID]);


  const handleDeleteComment = (commentId: number) => {
    setReviews(prevReviews => prevReviews.filter(comment => comment.id !== commentId));
  };

  const handleCommentSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!jwtToken || !userId) {
      console.error("JWT token or user ID is missing");
      alert("You must be logged in to submit a comment.");
      return;
    }

    const commentData = {
      model_id: model.Model_ID,
      comment: newComment,
    };

    try {
      const response = await fetch('https://techblacker.com/review/add_review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit comment");
      }
      setNewComment('');
      fetchReviews(); // Refresh comments after successful submission
    } catch (error) {
      console.error("Error while submitting the comment:", error);
      alert("An error occurred while submitting the comment.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">{model.Model_Name}</h1>
        <Button variant="secondary">Like</Button>
      </div>
      <div className="my-6">
        <CurvedlineChart className="w-full h-[300px]" data={defaultChartData} />
      </div>
      <Tabs className="mb-6" defaultValue="24hrs" >
        <TabsList>
          <TabsTrigger value="24hrs">24hrs</TabsTrigger>
          <TabsTrigger value="1week">1 week</TabsTrigger>
          <TabsTrigger value="1month">1 month</TabsTrigger>
          <TabsTrigger value="1year">1 year</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-1 my-4">
        <span className="font-semibold">{model.Creator_Name}</span>
        <span className="text-muted-foreground">{model.Creator_Email}</span>
      </div>
      <p className="my-4">{model.Description}</p>
      <div className={styles.outerContainer}>
        <div className={styles.header}>Community Feedback</div>
        <form className={styles.newCommentForm} onSubmit={handleCommentSubmit}>
        <textarea
            className={styles.commentInput}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyPress} // Add this line
            placeholder="Provide Feedback Here..."
            rows={3}
          ></textarea>
          <button type="submit" className={styles.submitButton}>Submit Feedback</button>
        </form>
        <div className={styles.commentsContainer}>
          {reviews.map(comment => (
             <Comment key={comment.id} comment={comment} onDelete={handleDeleteComment} />
          ))}
        </div>
      </div>
    </div>
  );
};

// const [timeframe, setTimeframe] = useState('24hrs');
// const [chartData, setChartData] = useState([]);

// useEffect(() => {
//     const fetchData = async () => {
//       // Simulate fetching data. Replace this with actual fetch call.
//       const rawData = AMZN.find(item => item.Timeframe_Name === timeframeMap[timeframe]).Raw_Data;
//       const parsedData = parseChartData(rawData);
//       setChartData([
//         { id: "Actual", data: parsedData.actual },
//         { id: "Predicted", data: parsedData.predicted },
//       ]);
//     };
  
//     fetchData();
//   }, [timeframe]);

const CurvedlineChart: React.FC<CurvedlineChartProps> = ({
  className,
  data,
}) => {
  return (
    <div className={className}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
};


export default GenericModelComponent;
