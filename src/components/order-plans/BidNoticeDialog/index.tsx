"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BidNotice } from "@/features/narashop/order-plan/types";

interface BidNoticeDialogProps {
  bidNotice: BidNotice | null;
  open: boolean;
  onClose: () => void;
}

export function BidNoticeDialog({
  bidNotice,
  open,
  onClose,
}: BidNoticeDialogProps) {
  if (!bidNotice || !open) return null;

  // 금액 포맷팅
  const formatAmount = (amount?: number) => {
    if (amount === undefined || amount === null) return "-";
    return amount.toLocaleString("ko-KR") + "원";
  };

  // 날짜 포맷팅
  const formatDateTime = (dateString?: string) => {
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

  // 첨부파일 목록 생성
  const attachments = [
    { url: bidNotice.ntce_spec_doc_url1, name: bidNotice.ntce_spec_file_nm1 },
    { url: bidNotice.ntce_spec_doc_url2, name: bidNotice.ntce_spec_file_nm2 },
    { url: bidNotice.ntce_spec_doc_url3, name: bidNotice.ntce_spec_file_nm3 },
    { url: bidNotice.ntce_spec_doc_url4, name: bidNotice.ntce_spec_file_nm4 },
    { url: bidNotice.ntce_spec_doc_url5, name: bidNotice.ntce_spec_file_nm5 },
  ].filter((file) => file.url && file.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">
                {bidNotice.bid_ntce_nm || "입찰공고 상세"}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {bidNotice.bid_ntce_no} · {bidNotice.ntce_kind_nm || "등록공고"}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="ml-4">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <section>
            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
              기본 정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="입찰공고번호" value={bidNotice.bid_ntce_no} />
              <InfoItem
                label="입찰공고차수"
                value={bidNotice.bid_ntce_ord || "-"}
              />
              <InfoItem
                label="참조번호"
                value={bidNotice.ref_no || "-"}
                className="col-span-2"
              />
              <InfoItem
                label="공고일시"
                value={formatDateTime(bidNotice.bid_ntce_dt)}
              />
              <InfoItem
                label="등록일시"
                value={formatDateTime(bidNotice.rgst_dt)}
              />
            </div>
          </section>

          {/* 금액 정보 */}
          <section>
            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
              금액 정보
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <InfoItem
                label="배정예산금액"
                value={formatAmount(bidNotice.asign_bdgt_amt)}
                highlight
              />
              <InfoItem
                label="추정가격"
                value={formatAmount(bidNotice.presmpt_prce)}
              />
              <InfoItem label="부가세" value={formatAmount(bidNotice.vat)} />
            </div>
          </section>

          {/* 일정 정보 */}
          <section>
            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
              일정 정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem
                label="입찰 개시"
                value={formatDateTime(bidNotice.bid_begin_dt)}
              />
              <InfoItem
                label="입찰 마감"
                value={formatDateTime(bidNotice.bid_close_dt)}
                highlight
              />
              <InfoItem
                label="개찰 일시"
                value={formatDateTime(bidNotice.openg_dt)}
              />
              <InfoItem
                label="개찰 장소"
                value={bidNotice.openg_plce || "-"}
              />
            </div>
          </section>

          {/* 기관 정보 */}
          <section>
            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
              기관 및 담당자 정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem
                label="수요기관"
                value={bidNotice.dminstt_nm || "-"}
              />
              <InfoItem
                label="공고기관"
                value={bidNotice.ntce_instt_nm || "-"}
              />
              <InfoItem
                label="담당자"
                value={bidNotice.ntce_instt_ofcl_nm || "-"}
              />
              <InfoItem
                label="연락처"
                value={bidNotice.ntce_instt_ofcl_tel_no || "-"}
              />
              <InfoItem
                label="이메일"
                value={bidNotice.ntce_instt_ofcl_email_adrs || "-"}
                className="col-span-2"
              />
            </div>
          </section>

          {/* 입찰/계약 방식 */}
          <section>
            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
              입찰 및 계약 정보
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem
                label="계약체결방법"
                value={bidNotice.cntrct_cnclms_mthd_nm || "-"}
              />
              <InfoItem
                label="입찰방식"
                value={bidNotice.bid_mthd_nm || "-"}
              />
              <InfoItem
                label="용역구분"
                value={bidNotice.srvce_div_nm || "-"}
              />
              <InfoItem
                label="낙찰방법"
                value={bidNotice.sucsfbid_mthd_nm || "-"}
              />
              <InfoItem
                label="낙찰하한율"
                value={
                  bidNotice.sucsfbid_lwlt_rate
                    ? `${bidNotice.sucsfbid_lwlt_rate}%`
                    : "-"
                }
              />
              <InfoItem
                label="정보화사업"
                value={bidNotice.info_biz_yn === "Y" ? "예" : "아니오"}
              />
            </div>
          </section>

          {/* 첨부파일 */}
          {attachments.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
                첨부파일 ({attachments.length}개)
              </h3>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <span className="text-sm font-medium text-blue-600 hover:underline">
                      📎 {file.name}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 나라장터 링크 */}
          {bidNotice.bid_ntce_dtl_url && (
            <section>
              <a
                href={bidNotice.bid_ntce_dtl_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  🔗 나라장터에서 보기
                </Button>
              </a>
            </section>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

// 정보 아이템 컴포넌트
interface InfoItemProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

function InfoItem({ label, value, highlight, className }: InfoItemProps) {
  return (
    <div className={className}>
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div
        className={`text-sm font-medium ${
          highlight ? "text-primary font-semibold" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
