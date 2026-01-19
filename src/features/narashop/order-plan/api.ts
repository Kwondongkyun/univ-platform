import { api } from "@/lib/api/axios";
import type {
  OrderPlanSearchParams,
  OrderPlanResponse,
  BidNotice,
} from "./types";

/**
 * 발주계획 목록을 조회하는 API
 * 백엔드 /order-plans 엔드포인트 호출
 *
 * @param params - 검색 파라미터 (page, size, minSimilarity)
 * @returns 발주계획 응답 데이터
 */
export async function getOrderPlanListApi(
  params: OrderPlanSearchParams = {}
): Promise<OrderPlanResponse> {
  const { page = 1, size = 10, minSimilarity } = params;

  // 쿼리 파라미터 생성
  const queryParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  // 유사도 필터가 있으면 추가
  if (minSimilarity !== undefined && minSimilarity !== null) {
    queryParams.append("min_similarity", String(minSimilarity));
  }

  const response = await api.get<OrderPlanResponse>(
    `/order-plans?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * 입찰공고 정보를 조회하는 API
 * 백엔드 /bid-notices/{bid_ntce_no} 엔드포인트 호출
 *
 * @param bidNtceNo - 입찰공고번호 (뒤 3자리 000 제거된 상태)
 * @returns 입찰공고 정보
 */
export async function getBidNoticeApi(bidNtceNo: string): Promise<BidNotice> {
  const response = await api.get<BidNotice>(`/bid-notices/${bidNtceNo}`);
  return response.data;
}
