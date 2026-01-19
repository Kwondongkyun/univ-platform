// 백엔드 OrderPlan 모델에 맞춘 타입 정의

// API 요청 파라미터 타입
export interface OrderPlanSearchParams {
  page?: number;
  size?: number;
  minSimilarity?: number; // 유사도 필터 (옵션)
}

// 입찰공고 정보 타입 (확장 버전 35개 필드)
export interface BidNotice {
  id?: number;

  // 1. 식별자 (3개)
  bid_ntce_no: string; // 입찰공고번호
  bid_ntce_ord?: string; // 입찰공고차수
  order_plan_unty_no?: string; // 발주계획통합번호 (FK)

  // 2. 기본 정보 (3개)
  bid_ntce_nm?: string; // 입찰공고명
  bid_ntce_dt?: string; // 입찰공고일시
  ref_no?: string; // 참조번호

  // 3. 금액 정보 (3개)
  asign_bdgt_amt?: number; // 배정예산금액
  presmpt_prce?: number; // 추정가격
  vat?: number; // 부가가치세

  // 4. 일정 정보 (3개)
  bid_begin_dt?: string; // 입찰개시일시
  bid_close_dt?: string; // 입찰마감일시
  openg_dt?: string; // 개찰일시

  // 5. 기관 정보 (2개)
  dminstt_nm?: string; // 수요기관명
  ntce_instt_nm?: string; // 공고기관명

  // 6. 담당자 정보 (3개)
  ntce_instt_ofcl_nm?: string; // 공고기관담당자명
  ntce_instt_ofcl_tel_no?: string; // 공고기관담당자전화번호
  ntce_instt_ofcl_email_adrs?: string; // 공고기관담당자이메일

  // 7. 공고 상태/종류 (3개)
  ntce_kind_nm?: string; // 공고종류명 (등록공고/변경공고/취소공고/재공고)
  rgst_dt?: string; // 등록일시
  chg_dt?: string; // 변경일시

  // 8. 입찰/계약 방식 (3개)
  cntrct_cnclms_mthd_nm?: string; // 계약체결방법명
  bid_mthd_nm?: string; // 입찰방식명
  srvce_div_nm?: string; // 용역구분명

  // 9. 낙찰 정보 (2개)
  sucsfbid_mthd_nm?: string; // 낙찰방법명
  sucsfbid_lwlt_rate?: string; // 낙찰하한율

  // 10. 링크/장소 (2개)
  bid_ntce_dtl_url?: string; // 입찰공고상세URL
  openg_plce?: string; // 개찰장소

  // 11. 특수 플래그 (2개)
  info_biz_yn?: string; // 정보화사업여부
  indstryty_lmt_yn?: string; // 업종제한여부

  // 12. 첨부파일 URL (5개)
  ntce_spec_doc_url1?: string;
  ntce_spec_doc_url2?: string;
  ntce_spec_doc_url3?: string;
  ntce_spec_doc_url4?: string;
  ntce_spec_doc_url5?: string;

  // 13. 첨부파일명 (5개)
  ntce_spec_file_nm1?: string;
  ntce_spec_file_nm2?: string;
  ntce_spec_file_nm3?: string;
  ntce_spec_file_nm4?: string;
  ntce_spec_file_nm5?: string;

  // 14. 메타 정보
  fetched_at?: string; // 수집일시
  created_at?: string;
  updated_at?: string;
}

// 발주계획 아이템 타입 (백엔드 OrderPlan 모델)
export interface OrderPlanItem {
  id?: number;

  // 식별자
  order_plan_unty_no: string; // 발주계획통합번호

  // 사업 기본 정보
  biz_nm: string; // 사업명
  bsns_div_cd?: string; // 사업구분코드
  bsns_div_nm?: string; // 사업구분명
  bsns_ty_cd?: string; // 사업유형코드
  bsns_ty_nm?: string; // 사업유형명

  // 발주 정보
  order_year?: string; // 발주년도
  order_mnth?: string; // 발주월
  order_instt_cd?: string; // 발주기관코드
  order_instt_nm?: string; // 발주기관명
  jrsdctn_div_cd?: string; // 소관구분코드
  jrsdctn_div_nm?: string; // 소관구분명

  // 금액 정보 (number 타입)
  sum_order_amt?: number; // 발주금액합계
  sum_order_dol_amt?: number; // 발주금액합계(달러)
  order_contrct_amt?: number; // 발주계약금액
  order_govsply_mtrcst?: number; // 발주관급자재비
  order_etc_amt?: number; // 발주기타금액

  // 계약 정보
  prcrmnt_methd?: string; // 조달방법
  cntrct_mthd_nm?: string; // 계약방법명

  // 담당자 정보
  dept_nm?: string; // 부서명
  ofcl_nm?: string; // 담당자명
  tel_no?: string; // 전화번호

  // 공고 정보
  ntce_ntice_yn?: string; // 공고여부
  notice_dt?: string; // 공고일시 (ISO string)
  bid_ntce_no_list?: string; // 입찰공고번호목록

  // 기타
  rmrk_cntnts?: string; // 비고내용
  chg_dt?: string; // 변경일시 (ISO string)

  // 유사도
  similarity_score?: number; // 유사도 점수

  // 입찰공고 (연관 데이터)
  bid_notices?: BidNotice[]; // 입찰공고 목록

  // 메타
  created_at?: string; // 생성일시 (ISO string)
  updated_at?: string; // 수정일시 (ISO string)
}

// API 응답 타입 (백엔드 응답 형식)
export interface OrderPlanResponse {
  items: OrderPlanItem[];
  count: number; // 현재 페이지 데이터 개수
  page: number;
  size: number;
  total: number; // 전체 데이터 개수
}
