import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { TaskUpdateForm } from "../TaskUpdateForm/TaskUpdateForm";
import toast from "react-hot-toast";
import axios from "axios";

const TaskCard = ({ refetch, task, category }) => {
  const { _id, title, description, timestamp } = task || {};

  const time = timestamp
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : "Unknown time";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
  });

  // Apply styles
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //Delete functionality
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      if (data.deletedCount > 0) {
        toast.success("Task Deleted Successfully!");
      }
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  //modern toast delete button
  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="space-x-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative cursor-grab bg-white dark:bg-gray-950 p-4 rounded-md space-y-5 md:space-y-10 lg:space-y-12 ${
        isDragging && "opacity-50"
      }`}
    >
      <div {...listeners} className="h-full space-y-5 md:space-y-8 min-h-28">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-primary">{title}</h3>
            {category ? (
              <span
                className={`text-xs font-light w-max border px-3 py-1 rounded-3xl
                  ${category === "ToDo" && "border-blue-500 bg-blue-500/30"}
                  ${
                    category === "InProgress" &&
                    "border-amber-500 bg-amber-500/30"
                  }
                  ${category === "Done" && "border-green-500 bg-green-500/30"}
                  `}
              >
                {category}
              </span>
            ) : (
              ""
            )}
          </div>
          <p className="text-sm font-light">{description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xs">{time}</p>
        </div>
      </div>
      {/* update & delete  */}
      <div className="absolute bottom-3 right-5 space-x-5">
        {/* Update button */}
        <button className="w-max">
          <TaskUpdateForm task={task} refetch={refetch} />
        </button>
        {/* Delete button */}
        <button onClick={() => modernDelete(_id)} className="w-max">
          <Trash2 size={20} color="#c51111" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
