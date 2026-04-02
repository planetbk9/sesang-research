// ============================================================
// Incheon Smart City – Citizen Voting System
// Static mockup data — realistic Incheon local issues
// ============================================================

import { Issue, District } from "@/types/issue";

// ── Helper to build a district ──────────────────────────────
const d = (gu: string, dong: string): District => ({ gu, dong });

// ── Mockup Issues ───────────────────────────────────────────
export const ISSUES: Issue[] = [
  // ── 부평구 ──────────────────────────────────────────────────
  {
    id: "issue-001",
    title: "부평역 인근 불법 주차로 골목 진입 불가",
    description:
      "부평역 5번 출구 인근 골목에 매일 저녁 불법 주차 차량이 30대 이상 늘어서 소방차와 구급차 진입이 불가능한 상황입니다. 주민 수차례 신고에도 근본적인 해결이 되지 않고 있습니다.",
    category: "주차",
    district: d("부평구", "부평동"),
    voteCount: 1847,
    reportedAt: "2025-11-03T09:15:00Z",
    status: "검토중",
  },
  {
    id: "issue-002",
    title: "삼산동 주택가 심야 공사 소음 피해",
    description:
      "삼산동 일대 대형 아파트 재개발 현장에서 자정 이후까지 공사가 이뤄져 주민들이 수면 피해를 호소하고 있습니다. 특히 어르신과 어린이 가구에서 민원이 집중되고 있습니다.",
    category: "소음",
    district: d("부평구", "삼산동"),
    voteCount: 1423,
    reportedAt: "2025-11-20T22:40:00Z",
    status: "처리중",
  },
  {
    id: "issue-003",
    title: "갈산동 어린이공원 놀이기구 파손 방치",
    description:
      "갈산동 어린이공원의 미끄럼틀 연결 부위가 파손되어 아이들이 다칠 위험이 있습니다. 6개월 이상 수리가 이뤄지지 않아 학부모들의 불안이 커지고 있습니다.",
    category: "공원시설",
    district: d("부평구", "갈산동"),
    voteCount: 982,
    reportedAt: "2025-10-15T14:20:00Z",
    status: "접수됨",
  },
  {
    id: "issue-004",
    title: "청천동 도로 싱크홀 발생 반복",
    description:
      "청천동 주요 도로에서 싱크홀이 3회 이상 반복 발생하고 있습니다. 임시 복구만 반복될 뿐 근본적인 하수관 노후화 문제가 해결되지 않아 주민 안전을 위협합니다.",
    category: "도로파손",
    district: d("부평구", "청천동"),
    voteCount: 1105,
    reportedAt: "2025-12-01T08:30:00Z",
    status: "처리중",
  },

  // ── 남동구 ──────────────────────────────────────────────────
  {
    id: "issue-005",
    title: "구월동 먹자골목 불법 음식물 쓰레기 투기",
    description:
      "구월동 먹자골목 이면도로에 새벽 시간대 음식점들이 음식물 쓰레기를 불법 투기하여 악취와 해충 발생이 심각합니다. 주변 주거지역 주민들이 큰 불편을 겪고 있습니다.",
    category: "불법투기",
    district: d("남동구", "구월동"),
    voteCount: 2134,
    reportedAt: "2025-10-22T06:10:00Z",
    status: "처리중",
  },
  {
    id: "issue-006",
    title: "논현동 공단 인근 도로 화물차 통행으로 노면 파손",
    description:
      "논현동 소래산업단지 인근 도로가 대형 화물차량의 반복 통행으로 노면이 심각하게 파손되었습니다. 균열과 포트홀로 인해 이륜차 운전자 낙상 사고가 2건 발생했습니다.",
    category: "도로파손",
    district: d("남동구", "논현동"),
    voteCount: 876,
    reportedAt: "2025-11-18T11:00:00Z",
    status: "검토중",
  },
  {
    id: "issue-007",
    title: "만수동 장마철 지하보도 반복 침수",
    description:
      "만수동 시외버스터미널 인근 지하보도가 해마다 장마철이 되면 침수되어 보행자 통행이 차단됩니다. 배수펌프 노후화가 원인으로 지목되나 교체 일정이 잡히지 않고 있습니다.",
    category: "침수",
    district: d("남동구", "만수동"),
    voteCount: 1567,
    reportedAt: "2025-09-05T16:45:00Z",
    status: "검토중",
  },
  {
    id: "issue-008",
    title: "서창동 버스 정류장 가로등 장기 소등",
    description:
      "서창동 2번 버스 정류장 인근 가로등 3개가 4개월째 점등되지 않아 야간에 귀가하는 시민들이 불안과 위험을 호소합니다. 여성 1인 가구 민원이 특히 많습니다.",
    category: "가로등",
    district: d("남동구", "서창동"),
    voteCount: 743,
    reportedAt: "2025-10-01T21:30:00Z",
    status: "접수됨",
  },

  // ── 연수구 ──────────────────────────────────────────────────
  {
    id: "issue-009",
    title: "송도 신도시 자전거도로 단절 구간 위험",
    description:
      "송도 5·6공구 경계 지점에서 자전거도로가 갑자기 끊겨 자전거 이용자들이 차도로 내려서야 합니다. 교통사고 위험이 매우 높아 빠른 연결 공사가 필요합니다.",
    category: "안전시설",
    district: d("연수구", "송도동"),
    voteCount: 1289,
    reportedAt: "2025-11-10T10:00:00Z",
    status: "검토중",
  },
  {
    id: "issue-010",
    title: "연수동 환경오염 공장 악취 민원 지속",
    description:
      "연수동 공장 밀집 지역에서 야간 시간대에 불명확한 악취가 반복적으로 발생해 주민들이 두통과 호흡기 불편을 호소합니다. 환경부 측정 결과 기준치를 초과한 적도 있었습니다.",
    category: "환경오염",
    district: d("연수구", "연수동"),
    voteCount: 1698,
    reportedAt: "2025-08-14T23:00:00Z",
    status: "처리중",
  },
  {
    id: "issue-011",
    title: "옥련동 스쿨존 교통신호등 시간 부적절",
    description:
      "옥련동 초등학교 앞 스쿨존 신호등의 보행자 신호 시간이 너무 짧아 어르신과 어린이가 횡단하다 차량과 아슬아슬하게 마주치는 상황이 빈번합니다. 신호 시간 연장을 요청합니다.",
    category: "교통신호",
    district: d("연수구", "옥련동"),
    voteCount: 1934,
    reportedAt: "2025-10-30T08:05:00Z",
    status: "처리중",
  },
  {
    id: "issue-012",
    title: "청학동 버스 노선 감차 이후 배차 간격 과도",
    description:
      "청학동을 경유하는 버스 노선이 지난해 감차 이후 배차 간격이 30분 이상으로 늘어났습니다. 대중교통 의존도가 높은 고령 주민들이 큰 불편을 겪고 있습니다.",
    category: "대중교통",
    district: d("연수구", "청학동"),
    voteCount: 1102,
    reportedAt: "2025-09-25T07:30:00Z",
    status: "접수됨",
  },

  // ── 서구 ────────────────────────────────────────────────────
  {
    id: "issue-013",
    title: "검단신도시 골목길 CCTV 음영 지역 범죄 불안",
    description:
      "검단 AA2블록 이면도로에는 CCTV가 설치되지 않아 야간 범죄 불안이 높습니다. 인근에서 오토바이 절도가 2건 발생한 이후 주민들이 CCTV 증설을 요청하고 있습니다.",
    category: "안전시설",
    district: d("서구", "검단동"),
    voteCount: 1456,
    reportedAt: "2025-12-05T20:00:00Z",
    status: "검토중",
  },
  {
    id: "issue-014",
    title: "가좌동 하천변 불법 쓰레기 매립",
    description:
      "가좌동 굴포천 둔치에 건설 폐기물 및 생활 쓰레기가 불법 매립되어 있습니다. 우기에 하천으로 유입될 경우 수질 오염이 우려됩니다. 즉각적인 수거와 단속이 필요합니다.",
    category: "불법투기",
    district: d("서구", "가좌동"),
    voteCount: 887,
    reportedAt: "2025-11-28T14:00:00Z",
    status: "접수됨",
  },
  {
    id: "issue-015",
    title: "신현동 장기 방치 공사장 침수 위험",
    description:
      "신현동 중단된 공사 현장의 깊은 구덩이에 빗물이 고여 있어 안전 위험이 매우 큽니다. 어린이 빠짐 사고가 발생할 수 있어 즉시 안전 펜스 설치와 배수 조치가 필요합니다.",
    category: "침수",
    district: d("서구", "신현동"),
    voteCount: 665,
    reportedAt: "2025-11-05T13:20:00Z",
    status: "접수됨",
  },

  // ── 계양구 ──────────────────────────────────────────────────
  {
    id: "issue-016",
    title: "계산동 교차로 비보호 좌회전 신호 사고 빈발",
    description:
      "계산동 계양대로·계산로 교차로에서 비보호 좌회전 구간의 신호 체계가 혼란스러워 접촉 사고가 한 달에 2~3건씩 발생합니다. 보호 좌회전 신호 신설이 시급합니다.",
    category: "교통신호",
    district: d("계양구", "계산동"),
    voteCount: 2042,
    reportedAt: "2025-10-08T17:15:00Z",
    status: "처리중",
  },
  {
    id: "issue-017",
    title: "효성동 도심 하천 악취 및 수질 오염",
    description:
      "효성동 굴포천 일부 구간에서 오수 유입으로 추정되는 심각한 악취가 발생하고 있습니다. 산책로 인근 주민들이 계절에 관계없이 피해를 호소하고 있어 원인 조사가 필요합니다.",
    category: "환경오염",
    district: d("계양구", "효성동"),
    voteCount: 1230,
    reportedAt: "2025-09-18T10:45:00Z",
    status: "검토중",
  },
  {
    id: "issue-018",
    title: "병방동 노후 어린이공원 안전 시설 교체 필요",
    description:
      "병방동 소재 3개 어린이공원의 철봉·그네 등 놀이기구가 15년 이상 된 노후 시설로 녹이 심하게 슬고 일부는 이미 사용 금지 상태입니다. 전면 교체가 필요합니다.",
    category: "공원시설",
    district: d("계양구", "병방동"),
    voteCount: 794,
    reportedAt: "2025-10-25T09:00:00Z",
    status: "접수됨",
  },

  // ── 미추홀구 ────────────────────────────────────────────────
  {
    id: "issue-019",
    title: "주안역 광장 노숙자 증가로 주민 불안",
    description:
      "주안역 광장 및 인근 지하도 내에 노숙인이 집중되면서 상인과 통행인들이 불안을 호소합니다. 사회적 지원과 함께 환경 개선을 위한 체계적인 대책이 필요합니다.",
    category: "안전시설",
    district: d("미추홀구", "주안동"),
    voteCount: 1678,
    reportedAt: "2025-11-12T11:30:00Z",
    status: "검토중",
  },
  {
    id: "issue-020",
    title: "숭의동 빌라 밀집 지역 불법 주차로 이중 주차 일상화",
    description:
      "숭의동 빌라 지역은 주차 공간이 절대적으로 부족해 이중·삼중 주차가 일상이 되었습니다. 응급차량이 진입하지 못해 119 신고 시 골든타임을 놓치는 사례까지 발생했습니다.",
    category: "주차",
    district: d("미추홀구", "숭의동"),
    voteCount: 2289,
    reportedAt: "2025-10-04T19:00:00Z",
    status: "처리중",
  },
  {
    id: "issue-021",
    title: "용현동 재래시장 인근 상습 침수",
    description:
      "용현동 재래시장 일대는 집중 호우 시 배수로 역류로 인해 매년 침수 피해가 반복됩니다. 시장 내 점포와 주택 저층부 침수로 재산 피해가 누적되고 있어 근본적 치수 대책이 필요합니다.",
    category: "침수",
    district: d("미추홀구", "용현동"),
    voteCount: 1812,
    reportedAt: "2025-07-15T14:00:00Z",
    status: "처리중",
  },

  // ── 동구 ────────────────────────────────────────────────────
  {
    id: "issue-022",
    title: "송현동 경사로 빙판 낙상 사고 위험",
    description:
      "송현동 언덕 경사로가 겨울철 결빙 시 매우 위험합니다. 지난 겨울에만 낙상 부상 신고가 5건 접수되었으나 제설·제빙 조치가 늦어 노인 보행자들이 큰 위험에 처해 있습니다.",
    category: "안전시설",
    district: d("동구", "송현동"),
    voteCount: 934,
    reportedAt: "2025-12-10T07:00:00Z",
    status: "접수됨",
  },
  {
    id: "issue-023",
    title: "만석동 항만 인근 미세먼지 및 분진 피해",
    description:
      "만석동 항만 하역 작업에서 발생하는 석탄·철광석 분진이 인근 주거지역으로 날려와 세탁물 오염과 호흡기 피해가 지속됩니다. 방진 시설 강화와 분기별 측정 공개를 요구합니다.",
    category: "환경오염",
    district: d("동구", "만석동"),
    voteCount: 1543,
    reportedAt: "2025-09-20T15:10:00Z",
    status: "처리중",
  },

  // ── 중구 ────────────────────────────────────────────────────
  {
    id: "issue-024",
    title: "신포동 관광거리 심야 소음 주거 민원",
    description:
      "신포동 관광·유흥 거리 인근 주거 지역 주민들이 주말 심야 시간대 음악 소리와 취객 소음으로 수면을 방해받고 있습니다. 특히 어린이집과 경로당이 밀집한 골목이 더욱 심각합니다.",
    category: "소음",
    district: d("중구", "신포동"),
    voteCount: 1355,
    reportedAt: "2025-11-01T23:50:00Z",
    status: "검토중",
  },
  {
    id: "issue-025",
    title: "운서동 공항 인근 도로 새벽 화물차 소음",
    description:
      "운서동 인천공항 접근 도로 주변 주거지에 새벽 2~5시에 화물트럭이 집중적으로 통행하며 엔진 소음과 진동이 심각합니다. 야간 통행 제한 또는 방음벽 설치를 요청합니다.",
    category: "소음",
    district: d("중구", "운서동"),
    voteCount: 987,
    reportedAt: "2025-10-14T04:30:00Z",
    status: "접수됨",
  },

  // ── 강화군 ──────────────────────────────────────────────────
  {
    id: "issue-026",
    title: "강화읍 농로 파손으로 농기계 운행 불가",
    description:
      "강화읍 일부 농로 구간이 파손·침하되어 대형 농기계 통행이 불가능한 상태입니다. 농번기에 작업 지연이 발생하고 있으며 수확기 전 우선 복구를 요청합니다.",
    category: "도로파손",
    district: d("강화군", "강화읍"),
    voteCount: 612,
    reportedAt: "2025-09-10T08:00:00Z",
    status: "완료",
  },
  {
    id: "issue-027",
    title: "선원면 버스 정류장 없는 마을 대중교통 소외",
    description:
      "선원면 일부 마을에 버스 정류장 자체가 없어 주민들이 1km 이상 걸어 나와야 합니다. 고령 인구 비율이 높아 의료 접근성 문제로도 이어지고 있어 수요 맞춤형 교통 서비스가 필요합니다.",
    category: "대중교통",
    district: d("강화군", "선원면"),
    voteCount: 488,
    reportedAt: "2025-08-22T10:00:00Z",
    status: "검토중",
  },
  {
    id: "issue-028",
    title: "길상면 가로등 부족으로 야간 보행 위험",
    description:
      "길상면 마을 진입로와 주거 골목에 가로등이 거의 없어 해 지면 완전한 암흑 상태가 됩니다. 농촌 고령 주민들이 야간 보행 중 부상을 당하는 사례가 이어지고 있어 태양광 가로등 설치를 요청합니다.",
    category: "가로등",
    district: d("강화군", "길상면"),
    voteCount: 356,
    reportedAt: "2025-10-18T19:30:00Z",
    status: "접수됨",
  },

  // ── 옹진군 ──────────────────────────────────────────────────
  {
    id: "issue-029",
    title: "백령도 선착장 침수 위험 방파제 보강 필요",
    description:
      "백령도 용기포 선착장 방파제 일부 구간이 파손되어 태풍이나 너울성 파도 시 선착장 시설과 주변 건물이 침수 위험에 노출됩니다. 도서 지역 주민들의 고립 우려가 큽니다.",
    category: "침수",
    district: d("옹진군", "백령면"),
    voteCount: 421,
    reportedAt: "2025-08-30T11:00:00Z",
    status: "검토중",
  },
  {
    id: "issue-030",
    title: "덕적도 공중화장실 환경 불량 및 관리 부재",
    description:
      "덕적도 선착장 및 해수욕장 인근 공중화장실이 관리 인력 부족으로 청결 상태가 매우 열악합니다. 여름 성수기 관광객이 몰리는 시기에 악취와 위생 문제가 심화되어 도서 이미지를 크게 해치고 있습니다.",
    category: "기타",
    district: d("옹진군", "덕적면"),
    voteCount: 287,
    reportedAt: "2025-07-28T10:00:00Z",
    status: "접수됨",
  },

  // ── 부평구 추가 ──────────────────────────────────────────────
  {
    id: "issue-031",
    title: "산곡동 재래시장 노후 전선 화재 위험",
    description:
      "산곡동 재래시장 내 점포 간 연결된 노후 전선이 외부에 노출된 채 방치되어 있습니다. 누전 차단기도 노후화된 곳이 많아 화재 위험이 높습니다. 전기 안전 점검과 교체가 시급합니다.",
    category: "안전시설",
    district: d("부평구", "산곡동"),
    voteCount: 1034,
    reportedAt: "2025-11-22T14:00:00Z",
    status: "검토중",
  },

  // ── 남동구 추가 ──────────────────────────────────────────────
  {
    id: "issue-032",
    title: "간석동 쓰레기 분리수거장 포화 상태",
    description:
      "간석동 공동주택 밀집 지역의 분리수거장이 매주 수거 전날이면 포화 상태에 이릅니다. 재활용 쓰레기가 넘쳐 길거리로 흘러나와 보행을 방해하고 미관을 해치고 있습니다. 수거 횟수 증가가 필요합니다.",
    category: "불법투기",
    district: d("남동구", "간석동"),
    voteCount: 768,
    reportedAt: "2025-12-08T08:00:00Z",
    status: "접수됨",
  },

  // ── 서구 추가 ──────────────────────────────────────────────
  {
    id: "issue-033",
    title: "청라동 호수공원 주변 불법 주정차 극심",
    description:
      "청라 호수공원 주변 도로에 주말이면 불법 주정차 차량이 넘쳐 정작 공원을 이용하려는 주민들이 접근하기 어렵습니다. 인근 소방 도로까지 막혀 안전 문제가 우려됩니다.",
    category: "주차",
    district: d("서구", "청라동"),
    voteCount: 1321,
    reportedAt: "2025-11-16T13:00:00Z",
    status: "처리중",
  },
];

// ── Derived helpers ──────────────────────────────────────────

/** All unique 구 names */
export const GU_LIST: string[] = Array.from(
  new Set(ISSUES.map((i) => i.district.gu))
).sort();

/** All unique 동/읍/면 names for a given 구 */
export function getDongList(gu: string): string[] {
  return Array.from(
    new Set(
      ISSUES.filter((i) => i.district.gu === gu).map((i) => i.district.dong)
    )
  ).sort();
}

/** Filter issues by district */
export function filterIssues(
  gu: string | null,
  dong: string | null
): Issue[] {
  return ISSUES.filter((issue) => {
    if (gu && issue.district.gu !== gu) return false;
    if (dong && issue.district.dong !== dong) return false;
    return true;
  });
}

/** Return issues sorted by vote count descending */
export function getRankedIssues(
  gu: string | null = null,
  dong: string | null = null
) {
  return filterIssues(gu, dong)
    .slice()
    .sort((a, b) => b.voteCount - a.voteCount)
    .map((issue, idx) => ({ ...issue, rank: idx + 1 }));
}
