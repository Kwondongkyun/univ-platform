"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderPlanSearchParams } from "@/features/narashop/order-plan/types";

interface SearchFormProps {
  onSearch: (params: OrderPlanSearchParams) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [minSimilarity, setMinSimilarity] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params: OrderPlanSearchParams = {
      page: 1,
      size: 10,
    };

    // 유사도 필터가 입력되었으면 추가
    if (minSimilarity) {
      const similarity = parseFloat(minSimilarity);
      if (!isNaN(similarity)) {
        params.minSimilarity = similarity;
      }
    }

    onSearch(params);
  };

  const handleReset = () => {
    setMinSimilarity("");
    onSearch({ page: 1, size: 10 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>발주계획 조회</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minSimilarity">최소 유사도 (선택)</Label>
              <Input
                id="minSimilarity"
                type="number"
                placeholder="0.0 ~ 1.0"
                value={minSimilarity}
                onChange={(e) => setMinSimilarity(e.target.value)}
                min="0"
                max="1"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground">
                유사도 점수가 입력값 이상인 항목만 표시됩니다.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              초기화
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "조회 중..." : "조회"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
