"use client";

import { Button } from "@/components/ui/button";
import type { OrderPlanItem } from "@/features/narashop/order-plan/types";
import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: OrderPlanItem[];
  disabled?: boolean;
}

export function ExportButton({ data, disabled }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("내보낼 데이터가 없습니다.");
      return;
    }

    // Excel 내보내기를 위한 데이터 가공
    const exportData = data.map((item) => ({
      발주계획통합번호: item.order_plan_unty_no,
      발주기관명: item.order_instt_nm || "",
      사업명: item.biz_nm,
      사업구분: item.bsns_div_nm || "",
      사업유형: item.bsns_ty_nm || "",
      발주년도: item.order_year || "",
      발주월: item.order_mnth || "",
      소관구분: item.jrsdctn_div_nm || "",
      조달방법: item.prcrmnt_methd || "",
      계약방법: item.cntrct_mthd_nm || "",
      발주금액합계: item.sum_order_amt || 0,
      발주계약금액: item.order_contrct_amt || 0,
      발주관급자재비: item.order_govsply_mtrcst || 0,
      발주기타금액: item.order_etc_amt || 0,
      부서명: item.dept_nm || "",
      담당자: item.ofcl_nm || "",
      전화번호: item.tel_no || "",
      공고여부: item.ntce_ntice_yn || "",
      공고일시: item.notice_dt || "",
      입찰공고번호목록: item.bid_ntce_no_list || "",
      유사도점수: item.similarity_score || "",
      비고: item.rmrk_cntnts || "",
    }));

    // 워크북 생성
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "발주계획");

    // 컬럼 너비 설정
    const columnWidths = [
      { wch: 20 }, // 발주계획통합번호
      { wch: 20 }, // 발주기관명
      { wch: 40 }, // 사업명
      { wch: 12 }, // 사업구분
      { wch: 12 }, // 사업유형
      { wch: 10 }, // 발주년도
      { wch: 8 }, // 발주월
      { wch: 12 }, // 소관구분
      { wch: 12 }, // 조달방법
      { wch: 12 }, // 계약방법
      { wch: 15 }, // 발주금액합계
      { wch: 15 }, // 발주계약금액
      { wch: 15 }, // 발주관급자재비
      { wch: 15 }, // 발주기타금액
      { wch: 15 }, // 부서명
      { wch: 10 }, // 담당자
      { wch: 15 }, // 전화번호
      { wch: 10 }, // 공고여부
      { wch: 20 }, // 공고일시
      { wch: 20 }, // 입찰공고번호목록
      { wch: 10 }, // 유사도점수
      { wch: 30 }, // 비고
    ];
    worksheet["!cols"] = columnWidths;

    // 파일 다운로드
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `발주계획_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || !data || data.length === 0}
    >
      Excel 내보내기
    </Button>
  );
}
