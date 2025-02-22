import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "@/providers/AuthProvider";

export function TaskForm({ refetch }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskCategory, setTaskCategory] = useState(null);
  const [error, setError] = useState({});
  const { user } = useContext(AuthContext);

  //   form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = taskCategory;

    // Validation
    if (!title) {
      setError({ title: "Title is required." });
      return;
    }
    if (title.length > 50) {
      setError({ title: "Title must not exceed 50 characters." });
      return;
    }
    if (description.length > 200) {
      setError({ description: "Description must not exceed 200 characters." });
      return;
    }
    if (!category) {
      setError({ category: "Category is required." });
      return;
    }

    // task data
    const taskData = {
      title,
      description,
      category,
      user: user?.email,
    };

    //save task data to db
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        taskData
      );
      if (data.insertedId) {
        toast.success("Task Create Successfully!");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog>
      <Button onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <Plus /> Create Task
      </Button>
      <Dialog
        className="overflow-y-auto"
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setError({});
            if (!open) {
              setDate(null);
            }
          }
        }}
      >
        <DialogContent className="rounded-md max-w-xs md:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogDescription>
              Manage your everyday task by Task Flow.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue="Task Title"
                  name="title"
                  className="col-span-3"
                />
                {error.title && (
                  <p className="text-red-500 text-sm col-span-3">
                    {error.title}
                  </p>
                )}
              </div>
              {/* description */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue="Task Description"
                  className="col-span-3"
                />
                {error.description && (
                  <p className="text-red-500 text-sm col-span-3">
                    {error.description}
                  </p>
                )}
              </div>
              {/* category */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setTaskCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Task Category</SelectLabel>
                      <SelectItem value="ToDo">To-Do</SelectItem>
                      <SelectItem value="InProgress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error.category && (
                  <p className="text-red-500 text-sm col-span-3">
                    {error.category}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
