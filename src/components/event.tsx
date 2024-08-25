import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FC, useState } from "react";
import CommentList from "./comment";
interface EventCardProps {
  poster: string;
  title: string;
  description: string;
  date: string;
  entry_fee: string;
  comments: any[];
  eventId: string;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, eventId: string, comment: string) => void;
}

const EventCard: FC<EventCardProps> = ({ poster, title, description, date, entry_fee, comments, eventId, handleSubmit }) => {
  const [localCommentText, setLocalCommentText] = useState<string>("");
  

  return (
    <Card className="my-4 p-6 shadow-lg rounded-lg max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image section */}
        <div className="md:w-2/3 w-full">
          <Image
            src={poster}
            alt={title}
            width={300}
            height={400}
            className="rounded-lg object-cover w-full h-full"
            priority={true} // Improves loading for above-the-fold images
          />
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between md:w-2/3">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-4 text-gray-700">{description}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>
                <i className="far fa-calendar"></i> Date: {date}
              </span>
              <span>
                <i className="fas fa-money-check"></i> Entry: {entry_fee}
              </span>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">COMMENTS:</h3>
            <CommentList comments={comments} />
           
            <div className="flex items-center bg-white border border-gray-300 rounded-full mt-4 p-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full bg-transparent text-black focus:outline-none px-4 py-2"
                value={localCommentText}
                onChange={(e) => setLocalCommentText(e.target.value)}
              />
              <button
                className="ml-2 text-black hover:text-blue-500 focus:outline-none"
                onClick={(e) => {
                  handleSubmit(e, eventId, localCommentText);
                  setLocalCommentText('');
                }}
              >
                <i className="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
