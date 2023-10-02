import {
  useGetAllBookMarksQuery,
  useRemoveEventFromBookMarkMutation,
  useSaveToBookMarkMutation,
} from "../store/API/BookMarkAPI";
import ItemCard from "../components/Card/ItemCard";
import { gradientTextStyles } from "../components/Text/TextStyles";
import { toast } from "react-toastify";

const BookMark = () => {
  const { data, isLoading, isError, isFetching } =
    useGetAllBookMarksQuery(null);
  console.log("Data from API:", data);

  const { data: bookmarksData } = useGetAllBookMarksQuery(null);

  console.log(data?.findUserBookMarks?.bookmarks);
  const [saveToBookMark] = useSaveToBookMarkMutation();
  const [removeEventFromBookMark] = useRemoveEventFromBookMarkMutation();

  const saveAnEventToBookMark = async ({ eventID }: { eventID: string }) => {
    await toast.promise(saveToBookMark({ eventID }).unwrap(), {
      pending: "Saving event to bookmark...",
      success: "Event saved to bookmark",
      error: "Failed to save event to bookmark",
    });
  };

  const removeAnEventFromBookmark = async ({
    eventID,
  }: {
    eventID: string;
  }) => {
    await toast.promise(removeEventFromBookMark({ eventID }).unwrap(), {
      pending: "Removing event from bookmark...",
      success: "Event removed from bookmark",
      error: "Failed to remove event from bookmark",
    });
  };

  if (isLoading || isFetching) {
    return <div>Loading, please wait...</div>;
  }

  if (isError) {
    console.error("Error loading data:", data);
    return <div>Error: Unable to load data</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <h2
        className={`${gradientTextStyles} text-center mb-10 mt-10 text-4xl font-bold capitalize w-full`}
      >
        Bookmarked Events
      </h2>
      <div className="flex space-x-20">
        {data?.data?.map(
          (event: {
            _id: string;
            date: Date;
            image: string;
            location: string;
            title: string;
          }) => (
            <ItemCard
              key={event._id}
              saveAnEventToBookMark={saveAnEventToBookMark}
              removeAnEventFromBookmark={removeAnEventFromBookmark}
              saved={bookmarksData?.findUserBookMarks?.bookmarks?.includes(
                event?._id
              )}
              {...event}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BookMark;
