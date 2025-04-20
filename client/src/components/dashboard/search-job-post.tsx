"use client";

import { Search } from "lucide-react";
import { Input } from "../plate-ui/input";
import { useQueryState } from "nuqs";

const SearchJobPost = () => {
  const [name, setName] = useQueryState("name");
  return (
    <div className="relative flex max-w-xl flex-1 items-center">
      <Input
        value={name}
        onChange={(e) => {
          e.target.value ? setName(e.target.value) : setName(null);
        }}
        placeholder="Search for an ai based mocked interview"
        className="w-full bg-neutral-900 py-5 text-white"
      />
      <Search className="absolute top-1/2 right-4 -translate-y-1/2" size={18} />
    </div>
  );
};

export default SearchJobPost;
