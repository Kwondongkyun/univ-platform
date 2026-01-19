"use client";

import { useState } from "react";
import { SearchForm } from "@/components/order-plans/SearchForm";
import { OrderPlanTable } from "@/components/order-plans/OrderPlanTable";
import { PaginationControls } from "@/components/order-plans/PaginationControls";
import { ExportButton } from "@/components/order-plans/ExportButton";
import { getOrderPlanListApi } from "@/features/narashop/order-plan/api";
import type {
  OrderPlanSearchParams,
  OrderPlanItem,
} from "@/features/narashop/order-plan/types";

export default function OrderPlansPage() {
  const [data, setData] = useState<OrderPlanItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // 현재 검색 파라미터 저장
  const [searchParams, setSearchParams] =
    useState<OrderPlanSearchParams | null>(null);

  const handleSearch = async (params: OrderPlanSearchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      // 검색 파라미터 저장
      setSearchParams(params);

      const response = await getOrderPlanListApi({
        ...params,
        page: 1,
        size: pageSize,
      });

      setData(response.items);
      setTotalCount(response.total);
      setCurrentPage(1);
    } catch (err) {
      console.error("Search error:", err);
      setError("조회 중 오류가 발생했습니다.");
      setData([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!searchParams) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getOrderPlanListApi({
        ...searchParams,
        page,
        size: pageSize,
      });

      setData(response.items);
      setCurrentPage(page);
    } catch (err) {
      console.error("Page change error:", err);
      setError("페이지 로딩 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowsChange = async (rows: number) => {
    setPageSize(rows);

    if (!searchParams) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getOrderPlanListApi({
        ...searchParams,
        page: 1,
        size: rows,
      });

      setData(response.items);
      setTotalCount(response.total);
      setCurrentPage(1);
    } catch (err) {
      console.error("Rows change error:", err);
      setError("데이터 로딩 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">나라장터 대학 사업 수집 플랫폼</h1>
        <p className="text-muted-foreground">
          조달청 나라장터의 대학 관련 발주계획을 조회할 수 있습니다.
        </p>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {totalCount > 0 && (
          <div className="flex justify-end">
            <ExportButton data={data} disabled={isLoading} />
          </div>
        )}

        <OrderPlanTable
          data={data}
          totalCount={totalCount}
          isLoading={isLoading}
        />

        {totalCount > 0 && !isLoading && (
          <PaginationControls
            currentPage={currentPage}
            totalCount={totalCount}
            numOfRows={pageSize}
            onPageChange={handlePageChange}
            onRowsChange={handleRowsChange}
          />
        )}
      </div>
    </div>
  );
}
