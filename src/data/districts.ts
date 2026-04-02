// Incheon Metropolitan City (인천광역시) District Data
// Source: Based on actual administrative districts of Incheon (2024)

export interface Dong {
  id: string;
  name: string; // Korean name
  nameEn: string; // Romanized name
}

export interface Gu {
  id: string;
  name: string; // Korean name
  nameEn: string; // Romanized name
  dongs: Dong[];
}

export const INCHEON_DISTRICTS: Gu[] = [
  {
    id: "jung-gu",
    name: "중구",
    nameEn: "Jung-gu",
    dongs: [
      { id: "jung-gu-eunsuk-dong", name: "은석동", nameEn: "Eunsuk-dong" },
      { id: "jung-gu-sinpo-dong", name: "신포동", nameEn: "Sinpo-dong" },
      { id: "jung-gu-sinhung-dong", name: "신흥동", nameEn: "Sinhung-dong" },
      { id: "jung-gu-dohwa-dong", name: "도화동", nameEn: "Dohwa-dong" },
      { id: "jung-gu-songwol-dong", name: "송월동", nameEn: "Songwol-dong" },
      { id: "jung-gu-yulmok-dong", name: "율목동", nameEn: "Yulmok-dong" },
      { id: "jung-gu-inhyeon-dong", name: "인현동", nameEn: "Inhyeon-dong" },
      { id: "jung-gu-gyodong", name: "교동", nameEn: "Gyo-dong" },
      { id: "jung-gu-unseo-dong", name: "운서동", nameEn: "Unseo-dong" },
      { id: "jung-gu-jungang-dong", name: "중앙동", nameEn: "Jungang-dong" },
      { id: "jung-gu-bukseong-dong", name: "북성동", nameEn: "Bukseong-dong" },
      { id: "jung-gu-hang-dong", name: "항동", nameEn: "Hang-dong" },
    ],
  },
  {
    id: "dong-gu",
    name: "동구",
    nameEn: "Dong-gu",
    dongs: [
      { id: "dong-gu-mandong", name: "만석동", nameEn: "Manseok-dong" },
      { id: "dong-gu-hwasumdong", name: "화수동", nameEn: "Hwasu-dong" },
      { id: "dong-gu-songnimdong", name: "송림동", nameEn: "Songlim-dong" },
      { id: "dong-gu-songhyundong", name: "송현동", nameEn: "Songhyeon-dong" },
      { id: "dong-gu-gangsandong", name: "강산동", nameEn: "Gangsan-dong" },
      { id: "dong-gu-hwapyeongdong", name: "화평동", nameEn: "Hwapyeong-dong" },
      { id: "dong-gu-chandong", name: "찬동", nameEn: "Chan-dong" },
      { id: "dong-gu-baeksadong", name: "백사동", nameEn: "Baeksa-dong" },
    ],
  },
  {
    id: "michuhol-gu",
    name: "미추홀구",
    nameEn: "Michuhol-gu",
    dongs: [
      { id: "michuhol-juansdong", name: "주안동", nameEn: "Juan-dong" },
      { id: "michuhol-dowhawadong", name: "도화동", nameEn: "Dohwa-dong" },
      { id: "michuhol-sunsindong", name: "숭의동", nameEn: "Sungui-dong" },
      { id: "michuhol-yongeomdong", name: "용현동", nameEn: "Yonghyeon-dong" },
      { id: "michuhol-hakikdong", name: "학익동", nameEn: "Hagik-dong" },
      { id: "michuhol-gwangukdong", name: "관교동", nameEn: "Gwangyo-dong" },
      { id: "michuhol-munhakdong", name: "문학동", nameEn: "Munhak-dong" },
      { id: "michuhol-useongdong", name: "우현동", nameEn: "Uhyeon-dong" },
      { id: "michuhol-gigandong", name: "기산동", nameEn: "Gisan-dong" },
    ],
  },
  {
    id: "yeonsu-gu",
    name: "연수구",
    nameEn: "Yeonsu-gu",
    dongs: [
      { id: "yeonsu-dongchundong", name: "동춘동", nameEn: "Dongchun-dong" },
      { id: "yeonsu-yeonsuudong", name: "연수동", nameEn: "Yeonsu-dong" },
      { id: "yeonsu-cheonghakdong", name: "청학동", nameEn: "Cheonghak-dong" },
      { id: "yeonsu-okryeondong", name: "옥련동", nameEn: "Okryeon-dong" },
      { id: "yeonsu-sondo", name: "선도", nameEn: "Seon-do" },
      { id: "yeonsu-songdodong", name: "송도동", nameEn: "Songdo-dong" },
      { id: "yeonsu-gachewondong", name: "가천원동", nameEn: "Gachwon-dong" },
      { id: "yeonsu-namchundong", name: "남춘동", nameEn: "Namchun-dong" },
    ],
  },
  {
    id: "namdong-gu",
    name: "남동구",
    nameEn: "Namdong-gu",
    dongs: [
      { id: "namdong-guwooldong", name: "구월동", nameEn: "Guwol-dong" },
      { id: "namdong-gandongdong", name: "간석동", nameEn: "Ganseok-dong" },
      { id: "namdong-mansusdong", name: "만수동", nameEn: "Mansu-dong" },
      { id: "namdong-namdongdong", name: "남동동", nameEn: "Namdong-dong" },
      { id: "namdong-noaeundong", name: "논현동", nameEn: "Nonhyeon-dong" },
      { id: "namdong-gojanddong", name: "고잔동", nameEn: "Gojan-dong" },
      { id: "namdong-seungidong", name: "서창동", nameEn: "Seochang-dong" },
      { id: "namdong-singidong", name: "신기동", nameEn: "Singi-dong" },
      { id: "namdong-dowhadong", name: "도림동", nameEn: "Dorim-dong" },
    ],
  },
  {
    id: "bupyeong-gu",
    name: "부평구",
    nameEn: "Bupyeong-gu",
    dongs: [
      { id: "bupyeong-bupyeongdong", name: "부평동", nameEn: "Bupyeong-dong" },
      { id: "bupyeong-ssangbongdong", name: "산곡동", nameEn: "Sangok-dong" },
      { id: "bupyeong-cheongchondong", name: "청천동", nameEn: "Cheongcheon-dong" },
      { id: "bupyeong-galssandong", name: "갈산동", nameEn: "Galsan-dong" },
      { id: "bupyeong-samsan1dong", name: "삼산1동", nameEn: "Samsan 1-dong" },
      { id: "bupyeong-samsan2dong", name: "삼산2동", nameEn: "Samsan 2-dong" },
      { id: "bupyeong-ilshindong", name: "일신동", nameEn: "Ilsin-dong" },
      { id: "bupyeong-seogumdong", name: "서곡동", nameEn: "Seogok-dong" },
      { id: "bupyeong-gyeongnidong", name: "경인동", nameEn: "Gyeongin-dong" },
      { id: "bupyeong-sinchondong", name: "신촌동", nameEn: "Sinchon-dong" },
    ],
  },
  {
    id: "gyeyang-gu",
    name: "계양구",
    nameEn: "Gyeyang-gu",
    dongs: [
      { id: "gyeyang-gyesan1dong", name: "계산1동", nameEn: "Gyesan 1-dong" },
      { id: "gyeyang-gyesan2dong", name: "계산2동", nameEn: "Gyesan 2-dong" },
      { id: "gyeyang-gyesan3dong", name: "계산3동", nameEn: "Gyesan 3-dong" },
      { id: "gyeyang-gyesan4dong", name: "계산4동", nameEn: "Gyesan 4-dong" },
      { id: "gyeyang-jakjondong", name: "작전동", nameEn: "Jakjeon-dong" },
      { id: "gyeyang-hyowangdong", name: "효왕동", nameEn: "Hyowang-dong" },
      { id: "gyeyang-gyeyangdong", name: "계양동", nameEn: "Gyeyang-dong" },
      { id: "gyeyang-bugaedong", name: "부개동", nameEn: "Bugae-dong" },
      { id: "gyeyang-seoundong", name: "서운동", nameEn: "Seoun-dong" },
    ],
  },
  {
    id: "seo-gu",
    name: "서구",
    nameEn: "Seo-gu",
    dongs: [
      { id: "seo-gajwadong", name: "가좌동", nameEn: "Gajwa-dong" },
      { id: "seo-seokkimdong", name: "석남동", nameEn: "Seongnam-dong" },
      { id: "seo-sindidong", name: "신현동", nameEn: "Sinhyeon-dong" },
      { id: "seo-geomamsdong", name: "검암동", nameEn: "Geomam-dong" },
      { id: "seo-geomdalsdong", name: "검단동", nameEn: "Geomdan-dong" },
      { id: "seo-danghadong", name: "당하동", nameEn: "Dangha-dong" },
      { id: "seo-woowondong", name: "원당동", nameEn: "Wondang-dong" },
      { id: "seo-magongssdong", name: "마전동", nameEn: "Majeon-dong" },
      { id: "seo-singansdong", name: "신강동", nameEn: "Singang-dong" },
      { id: "seo-cheongsadong", name: "청라동", nameEn: "Cheongna-dong" },
      { id: "seo-baeggidong", name: "백석동", nameEn: "Baekseok-dong" },
    ],
  },
  {
    id: "ganghwa-gun",
    name: "강화군",
    nameEn: "Ganghwa-gun",
    dongs: [
      { id: "ganghwa-ganghwaeup", name: "강화읍", nameEn: "Ganghwa-eup" },
      { id: "ganghwa-sondong", name: "선원면", nameEn: "Seonwon-myeon" },
      { id: "ganghwa-bulunmyeon", name: "불은면", nameEn: "Bureun-myeon" },
      { id: "ganghwa-gilsangmyeon", name: "길상면", nameEn: "Gilsang-myeon" },
      { id: "ganghwa-hwadosdong", name: "화도면", nameEn: "Hwado-myeon" },
      { id: "ganghwa-yangsahmyeon", name: "양사면", nameEn: "Yangsa-myeon" },
      { id: "ganghwa-songhaemyeon", name: "송해면", nameEn: "Songhae-myeon" },
      { id: "ganghwa-hagdongmyeon", name: "하점면", nameEn: "Hajeom-myeon" },
    ],
  },
  {
    id: "ongjin-gun",
    name: "옹진군",
    nameEn: "Ongjin-gun",
    dongs: [
      { id: "ongjin-bukdosdong", name: "북도면", nameEn: "Bukdo-myeon" },
      { id: "ongjin-deokjeokdong", name: "덕적면", nameEn: "Deokjeok-myeon" },
      { id: "ongjin-jawoldong", name: "자월면", nameEn: "Jawol-myeon" },
      { id: "ongjin-daecheongdong", name: "대청면", nameEn: "Daecheong-myeon" },
      { id: "ongjin-baengnyeongdong", name: "백령면", nameEn: "Baengnyeong-myeon" },
      { id: "ongjin-yeonpyeongdong", name: "연평면", nameEn: "Yeonpyeong-myeon" },
    ],
  },
];

// Helper: get all gu names
export const getGuList = (): Gu[] => INCHEON_DISTRICTS;

// Helper: get dongs for a given gu id
export const getDongsByGuId = (guId: string): Dong[] => {
  const gu = INCHEON_DISTRICTS.find((g) => g.id === guId);
  return gu ? gu.dongs : [];
};

// Helper: find a specific dong by its id
export const getDongById = (dongId: string): Dong | undefined => {
  for (const gu of INCHEON_DISTRICTS) {
    const dong = gu.dongs.find((d) => d.id === dongId);
    if (dong) return dong;
  }
  return undefined;
};

// Helper: find which gu a dong belongs to
export const getGuByDongId = (dongId: string): Gu | undefined => {
  return INCHEON_DISTRICTS.find((gu) =>
    gu.dongs.some((d) => d.id === dongId)
  );
};
