"use client";
import { Search } from "lucide-react";
import { Input } from "../plate-ui/input";
import { useQueryState } from "nuqs";
import { useState } from "react";

const SearchJobPost = () => {
  const [name, setName] = useQueryState("name");
  const [filter, setFilter] = useState<string>(name || "");

  const handleChange = (name: string) => {
    setFilter(name);
    setName(name.length < 1 ? null : name);
  };

  return (
    <div className="relative flex max-w-xl flex-1 items-center">
      <Input
        value={filter}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search for an ai based mocked interview"
        className="w-full bg-neutral-900 py-5 text-white"
      />
      <Search className="absolute top-1/2 right-4 -translate-y-1/2" size={18} />
    </div>
  );
};

export default SearchJobPost;
