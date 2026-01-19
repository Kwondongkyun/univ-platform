"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type {
  OrderPlanItem,
  BidNotice,
} from "@/features/narashop/order-plan/types";
import { getBidNoticeApi } from "@/features/narashop/order-plan/api";
import { BidNoticeDialog } from "@/components/order-plans/BidNoticeDialog";

interface OrderPlanTableProps {
  data: OrderPlanItem[];
  totalCount?: number;
  isLoading?: boolean;
}

export function OrderPlanTable({
  data,
  totalCount,
  isLoading,
}: OrderPlanTableProps) {
  const [selectedBidNotice, setSelectedBidNotice] = useState<BidNotice | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingBidNtceNo, setLoadingBidNtceNo] = useState<string | null>(null);

  // 통합된 입찰공고 조회 함수 (캐시 있으면 바로 표시, 없으면 API 호출)
  const handleViewBidNotice = async (item: OrderPlanItem) => {
    // 캐시가 있으면 바로 표시
    if (item.bid_notices && item.bid_notices.length > 0) {
      setSelectedBidNotice(item.bid_notices[0]);
      setDialogOpen(true);
      return;
    }

    // 캐시가 없으면 API 호출
    if (!item.bid_ntce_no_list) return;
    
    const bidNtceNo = item.bid_ntce_no_list.slice(0, -3);
    setLoadingBidNtceNo(bidNtceNo);

    try {
      const bidNotice = await getBidNoticeApi(bidNtceNo);
      setSelectedBidNotice(bidNotice);
      setDialogOpen(true);
    } catch (error) {
      console.error("입찰공고 조회 실패:", error);
      alert("입찰공고 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoadingBidNtceNo(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>검색 결과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-10">
            <p className="text-muted-foreground">데이터를 불러오는 중...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>검색 결과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-10">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 금액 포맷팅 함수 (number 타입)
  const formatAmount = (amount?: number) => {
    if (amount === undefined || amount === null) return "-";
    return amount.toLocaleString("ko-KR") + "원";
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // 유사도 포맷팅 함수
  const formatSimilarity = (score?: number) => {
    if (score === undefined || score === null) return "-";
    return (score * 100).toFixed(1) + "%";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          검색 결과 (전체 {totalCount?.toLocaleString() || 0}건)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">발주기관명</TableHead>
                <TableHead className="min-w-[300px]">사업명</TableHead>
                <TableHead className="min-w-[100px]">계약방법</TableHead>
                <TableHead className="min-w-[120px]">발주금액</TableHead>
                <TableHead className="min-w-[100px]">발주년월</TableHead>
                <TableHead className="min-w-[150px]">공고일시</TableHead>
                <TableHead className="min-w-[100px]">부서명</TableHead>
                <TableHead className="min-w-[80px]">담당자</TableHead>
                <TableHead className="min-w-[120px]">전화번호</TableHead>
                <TableHead className="min-w-[80px]">유사도</TableHead>
                <TableHead className="min-w-[120px]">입찰공고</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.order_plan_unty_no || `item-${index}`}>
                  <TableCell className="font-medium">
                    {item.order_instt_nm || "-"}
                  </TableCell>
                  <TableCell>{item.biz_nm}</TableCell>
                  <TableCell>{item.cntrct_mthd_nm || "-"}</TableCell>
                  <TableCell className="text-right">
                    {formatAmount(item.sum_order_amt)}
                  </TableCell>
                  <TableCell>
                    {item.order_year && item.order_mnth
                      ? `${item.order_year}-${item.order_mnth}`
                      : item.order_year || "-"}
                  </TableCell>
                  <TableCell>{formatDate(item.notice_dt)}</TableCell>
                  <TableCell>{item.dept_nm || "-"}</TableCell>
                  <TableCell>{item.ofcl_nm || "-"}</TableCell>
                  <TableCell>{item.tel_no || "-"}</TableCell>
                  <TableCell className="text-right">
                    {formatSimilarity(item.similarity_score)}
                  </TableCell>
                  <TableCell>
                    {!item.bid_ntce_no_list ? (
                      // 공고 예정
                      <span className="text-sm text-muted-foreground">
                        📋 공고 예정
                      </span>
                    ) : (
                      // 통합된 상세보기 버튼
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleViewBidNotice(item)}
                        disabled={
                          loadingBidNtceNo === item.bid_ntce_no_list?.slice(0, -3)
                        }
                      >
                        {loadingBidNtceNo === item.bid_ntce_no_list?.slice(0, -3)
                          ? "⏳ 조회중..."
                          : "📄 상세보기"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* 입찰공고 상세 모달 */}
      <BidNoticeDialog
        bidNotice={selectedBidNotice}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Card>
  );
}
