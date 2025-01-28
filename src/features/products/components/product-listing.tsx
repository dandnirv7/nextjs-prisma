"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchMenus } from "services/menu";
import { Menu } from "@prisma/client";
import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./product-tables/columns";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";

export default function ProductListingPage() {
  const searchParams = useSearchParams();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [totalItems, setTotalItems] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("q") || "";
    const categories = searchParams.get("categories") || "";

    return {
      page,
      limit,
      search,
      categories,
    };
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("q") || "";
    const categories = searchParams.get("categories") || "";

    setFilters({
      page,
      limit,
      search,
      categories,
    });
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchMenus(
        filters.page,
        filters.limit,
        filters.search,
        filters.categories
      );

      setMenus(data.menus || []);
      setTotalItems(data.total_menus || 0);
    } catch (err) {
      setError("Failed to fetch menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  if (loading) {
    return <DataTableSkeleton columnCount={7} rowCount={10} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ProductTable columns={columns} data={menus} totalItems={totalItems} />
  );
}
