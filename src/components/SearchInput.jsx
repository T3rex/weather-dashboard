import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSearchCitiesQuery } from "../store/api/weatherApi";

function SearchInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isFetching } = useSearchCitiesQuery(query, {
    skip: query.length < 2,
  });

  const handleSelect = (item) => {
    onSelect(item.name);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-full sm:max-w-md mx-auto">
      <Input
        className="bg-white text-sm sm:text-base"
        placeholder="Search city..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && query.length >= 2 && (
        <Card
          className="
            absolute z-50 mt-1 w-full
            max-h-[60vh] sm:max-h-64
            overflow-y-auto
            rounded-lg shadow-md
          "
        >
          {isFetching && (
            <p className="p-3 text-sm text-muted-foreground">Searching...</p>
          )}

          {!isFetching && data?.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              No results found
            </p>
          )}

          {data?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="
                px-4 py-2
                cursor-pointer
                hover:bg-accent
                active:bg-accent
                transition-colors
              "
            >
              <p className="font-medium text-sm sm:text-base">{item.name}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {item.region}, {item.country}
              </p>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default SearchInput;
