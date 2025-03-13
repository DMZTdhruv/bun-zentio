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
import { createJobPost } from "~/schema/job-post";

const CreateJobPost = () => {
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
      const data = createJobPost.parse(formData);
      console.log(data);
      setErrors({
        company: "",
        description: "",
        job_type: "",
        position: "",
        title: "",
      });

      console.log("Form submitted:", formData);
      // Add your form submission logic here
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format and set validation errors
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer px-8 py-5 text-base font-semibold">
          Create one
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-8 sm:max-w-[455px]">
        <DialogHeader className="py-4">
          <DialogTitle className="text-center text-2xl">
            Create an AI based mock interview
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-sm text-center">
            Practice solving AI generated interview problems based on the job
            context and level{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <Input
              name="company"
              className="bg-neutral-900"
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
              className="bg-neutral-900"
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
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
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
            className="bg-neutral-900"
            placeholder="Enter a location"
            value={formData.location}
            onChange={handleChange}
          />

          <div>
            <Input
              name="title"
              className="bg-neutral-900"
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
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobPost;
