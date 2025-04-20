"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";

import { z } from "zod";
import { createJobPost } from "~/schema/job";
import { useMutation } from "@tanstack/react-query";
import { createJobAction } from "~/actions/job";
import { toast } from "sonner";
import { _useAuthStore } from "~/store/user";
import { motion, AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { getJobPostsQueryOptions } from "~/actions/job/query-options";

const CreateJobPost = () => {
  const queryClient = useQueryClient();
  const jobTypes = [
    "frontend",
    "backend",
    "fullstack",
    "mobile",
    "devops",
    "machine learning",
    "cyber security",
  ];
  const user = _useAuthStore((state) => state.user);

  const [openDialog, setOpenDiaglog] = useState<boolean>(false);
  const { isPending, mutate } = useMutation({
    mutationFn: createJobAction,
    onSuccess: () => {
      toast.success("craeted job post successfully");
      queryClient.invalidateQueries(getJobPostsQueryOptions);
      setOpenDiaglog(false);
    },
  });

  const [formData, setFormData] = useState({
    company: "",
    description: "",
    job_type: "",
    position: "",
    location: "",
    title: "",
    public: true,
  });

  const [errors, setErrors] = useState({
    company: "",
    description: "",
    job_type: "",
    position: "",
    title: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      public: checked,
    });
  };

  const handleSubmit = () => {
    try {
      if (!user.username) return;
      console.log("making api call..");
      const data = createJobPost.parse(formData);
      console.log(formData);
      setErrors({
        company: "",
        description: "",
        job_type: "",
        position: "",
        title: "",
      });
      mutate({
        ...data,
        created_by: user.username,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {
          company: "",
          description: "",
          job_type: "",
          position: "",
          title: "",
        };

        error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof newErrors;
          if (field in newErrors) {
            newErrors[field] = err.message;
          }
        });

        setErrors(newErrors);
        setTimeout(() => {
          setErrors({
            company: "",
            description: "",
            job_type: "",
            position: "",
            title: "",
          });
        }, 3000);
      }
    }
  };

  const handleOpenDialog = (value: boolean) => {
    setOpenDiaglog(value);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDiaglog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => handleOpenDialog(true)}
          className="cursor-pointer px-8 py-5 text-base font-bold"
        >
          Create one
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-950/40 pt-8 backdrop-blur-3xl sm:max-w-[455px]">
        <DialogHeader className="py-4">
          <DialogTitle className="text-center text-2xl leading-[1.2] tracking-tighter">
            Create AI Interview
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-sm text-center leading-[1.2]">
            Practice solving AI generated interview problems based on the job
            context and level{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <Input
              name="company"
              className="dark:bg-input/30 dark:hover:bg-input/50"
              placeholder="Enter a company name"
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company}</p>
            )}
          </div>

          <div>
            <Textarea
              name="description"
              className="dark:bg-input/30 dark:hover:bg-input/50"
              placeholder="Enter this job description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <Select
              onValueChange={(value) => handleSelectChange("job_type", value)}
            >
              <SelectTrigger className="w-full bg-neutral-900">
                <SelectValue
                  placeholder="Enter a job type"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.job_type && (
              <p className="mt-1 text-sm text-red-500">{errors.job_type}</p>
            )}
          </div>

          <div>
            <Select
              onValueChange={(value) => handleSelectChange("position", value)}
            >
              <SelectTrigger className="w-full bg-neutral-900">
                <SelectValue
                  placeholder="Enter a job position"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="mt-1 text-sm text-red-500">{errors.position}</p>
            )}
          </div>

          <p className="px-0.5 py-1 text-sm">Optional</p>

          <Input
            name="location"
            className="dark:bg-input/30 dark:hover:bg-input/50"
            placeholder="Enter a location"
            value={formData.location}
            onChange={handleChange}
          />

          <div>
            <Input
              name="title"
              className="dark:bg-input/30 dark:hover:bg-input/50"
              placeholder="Enter a title cause why not"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex w-full items-center justify-between">
          <div className="flex flex-1 items-center gap-1">
            <span className="text-xs">Public</span>
            <Switch
              className="cursor-pointer"
              checked={formData.public}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          <Button
            type="button"
            className="cursor-pointer font-medium tracking-tight"
            onClick={handleSubmit}
            disabled={isPending}
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="pt-1"
                >
                  Creating...
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="pt-1"
                >
                  Create
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobPost;
