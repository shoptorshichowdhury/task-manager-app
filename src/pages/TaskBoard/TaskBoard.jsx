import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskForm } from "@/components/TaskForm/TaskForm";
import axios from "axios";
import { CircleCheckBig } from "lucide-react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const TaskBoard = () => {
  const { user } = useContext(AuthContext);

  const {
    data: tasksData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${user?.email}`
      );
      return data;
    },
  });

  const [tasks, setTasks] = useState({
    ToDo: [],
    InProgress: [],
    Done: [],
  });

  useEffect(() => {
    const newTasks = {
      ToDo: tasksData.filter((task) => task.category === "ToDo"),
      InProgress: tasksData.filter((task) => task.category === "InProgress"),
      Done: tasksData.filter((task) => task.category === "Done"),
    };

    if (JSON.stringify(newTasks) !== JSON.stringify(tasks)) {
      setTasks(newTasks);
    }
  }, [tasksData]);

  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    setActiveTask(active.id);
  }, []);

  const handleDragEnd = useCallback(async (event) => {
    const { active, over } = event;

    if (!over) {
      console.log("No valid drop target");
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const sourceCategory = Object.keys(tasks).find((category) =>
      tasks[category].some((task) => task._id === activeId)
    );
    const destinationCategory =
      Object.keys(tasks).find((category) =>
        tasks[category].some((task) => task._id === overId)
      ) || over.id;

    if (!sourceCategory || !destinationCategory) {
      console.log("Source or destination category not found");
      return;
    }

    const updatedTasks = { ...tasks };
    const sourceTasks = updatedTasks[sourceCategory];
    const movedTaskIndex = sourceTasks.findIndex(
      (task) => task._id === activeId
    );
    const movedTask = sourceTasks[movedTaskIndex];

    if (!movedTask) {
      console.log("Task not found in source category");
      return;
    }

    sourceTasks.splice(movedTaskIndex, 1);
    const destinationTasks = updatedTasks[destinationCategory];

    let insertIndex;

    if (destinationTasks.length === 0) {
      insertIndex = 0;
    } else {
      const overIndex = destinationTasks.findIndex(
        (task) => task._id === overId
      );

      if (overIndex === -1) {
        insertIndex = destinationTasks.length;
      } else {
        const isDroppingBelow =
          event.delta.y > 0 &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height / 2;

        insertIndex = isDroppingBelow ? overIndex + 1 : overIndex;

        if (sourceCategory === destinationCategory) {
          if (movedTaskIndex < overIndex) {
            insertIndex -= 1;
          }
        }
      }
    }

    destinationTasks.splice(insertIndex, 0, movedTask);
    movedTask.category = destinationCategory;

    destinationTasks.forEach((task, index) => {
      task.order = index + 1;
    });

    setTasks(updatedTasks);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/update-order/${user?.email}`,
        {
          tasks: destinationTasks.map((task) => ({
            _id: task._id,
            order: task.order,
            category: task.category,
          })),
        }
      );
      console.log("Backend Response:", response.data);
    } catch (err) {
      console.log("Error updating backend:", err);
    }

    setActiveTask(null);
  }, [tasks, user]);

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 100, tolerance: 10 },
  });

  const sensors = useSensors(
    ...(!isTouchDevice ? [pointerSensor] : []),
    touchSensor
  );

  const taskIds = useMemo(() => {
    return {
      ToDo: tasks.ToDo.map((task) => task._id),
      InProgress: tasks.InProgress.map((task) => task._id),
      Done: tasks.Done.map((task) => task._id),
    };
  }, [tasks]);

  return (
    <section className="my-8">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl md:text-2xl">
          <CircleCheckBig color="#EA580C" /> Tasks
        </h3>
        <TaskForm refetch={refetch} />
      </div>

      <div className="w-full mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <section className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {["ToDo", "InProgress", "Done"].map((category) => (
              <DroppableSection key={category} id={category}>
                <div className="bg-gray-300 dark:bg-gray-800 rounded-t-lg p-3">
                  <h2 className="text-lg font-semibold flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        category === "ToDo" && "bg-blue-500"
                      } ${category === "InProgress" && "bg-amber-500"} ${
                        category === "Done" && "bg-green-500"
                      }`}
                    ></div>
                    {category}
                  </h2>
                </div>
                <div className="p-3 space-y-3">
                  <SortableContext
                    items={taskIds[category]}
                    strategy={rectSortingStrategy}
                  >
                    {tasks[category]?.map((task) => (
                      <TaskCard
                        refetch={refetch}
                        key={task._id}
                        task={task}
                        category={category}
                      />
                    ))}
                  </SortableContext>

                  {tasks[category].length === 0 && (
                    <div className="h-16 flex items-center justify-center text-gray-500">
                      Drop Here
                    </div>
                  )}
                </div>
              </DroppableSection>
            ))}
          </section>

          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={
                  tasks.ToDo.find((t) => t._id === activeTask) ||
                  tasks.InProgress.find((t) => t._id === activeTask) ||
                  tasks.Done.find((t) => t._id === activeTask)
                }
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

const DroppableSection = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className="w-full bg-gray-200 dark:bg-gray-900 rounded-lg min-h-[150px]"
    >
      {children}
    </div>
  );
};

export default TaskBoard;