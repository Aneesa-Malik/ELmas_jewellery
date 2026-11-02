import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export const formatRs = (n) => "Rs. " + Number(n).toLocaleString("en-US");

// Sorting used by Jewellery, Collections and the Admin page
export const SORT_OPTIONS = [
  { value: "default", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export function sortItems(list, mode, nameKey = "name") {
  const copy = [...list];
  if (mode === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (mode === "price-desc") return copy.sort((a, b) => b.price - a.price);
  if (mode === "name-asc") {
    return copy.sort(
      (a, b) =>
        String(a[nameKey]).localeCompare(String(b[nameKey]), undefined, { sensitivity: "base" }) ||
        a.price - b.price
    );
  }
  return copy;
}
