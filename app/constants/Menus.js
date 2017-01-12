import { INSOYA_HOST } from '../config';
import Post from '../containers/Post';
import Info from '../components/Info';

const MENUS = [
  {
    icon: 'archive', title: '메이플 정보', component: Post,
    menus: [
      { group: 'news', title: '새소식', url: `${INSOYA_HOST}zboard.php?id=bbs11&divpage=1` },
      { group: 'info', title: '정보나눔터', url: `${INSOYA_HOST}zboard.php?id=maple_info&divpage=2` },
    ],
  },
  {
    icon: 'comments', title: '메이플 커뮤니티', component: Post,
    menus: [
      { group: 'maple', title: '메이플 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple&divpage=18` },
      { group: 'reboot', title: '리부트 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=5` },
      { group: 'world', title: '해외 토크', url: `${INSOYA_HOST}zboard.php?id=talkmaple_world_etc&category=1` },
      { group: 'mobile', title: '모바일 메이플', url: `${INSOYA_HOST}zboard.php?id=maple_mobile&divpage=1` },
    ],
  },
  {
    icon: 'users', title: '직업별 토크', component: Post,
    menus: [
      { group: 'jobtalk', title: '전체보기', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9` },
      { group: 'common', title: '공통', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&category=999&divpage=9` },
      { group: 'hero', title: '히어로', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=111` },
      { group: 'paladin', title: '팔라딘', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=112` },
      { group: 'dark-knight', title: '다크나이트', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=113` },
      { group: 'soul-master', title: '소울마스터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=121` },
      { group: 'mikhail', title: '미하일', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=122` },
      { group: 'aran', title: '아란', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=131` },
      { group: 'demon-slayer', title: '데몬슬레이어', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=141` },
      { group: 'demon-avenger', title: '데몬어벤져', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=142` },
      { group: 'blaster', title: '블래스터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=143` },
      { group: 'kaiser', title: '카이저', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=151` },
      { group: 'zero', title: '제로', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=161` },
      { group: 'pink-bin', title: '핑크빈', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=191` },
      { group: 'archmage-fire', title: '아크메이지 (불/독)', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=211` },
      { group: 'archmage-ice', title: '아크메이지 (썬/콜)', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=212` },
      { group: 'bishop', title: '비숍', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=213` },
      { group: 'flame-wizard', title: '플레임위자드', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=221` },
      { group: 'evan', title: '에반', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=231` },
      { group: 'luminous', title: '루미너스', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=232` },
      { group: 'battle-mage', title: '배틀메이지', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=241` },
      { group: 'kinesis', title: '키네시스', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=271` },
      { group: 'bow-master', title: '보우마스터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=311` },
      { group: 'master-archer', title: '신궁', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=312` },
      { group: 'wind-breaker', title: '윈드브레이커', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=321` },
      { group: 'mercedes', title: '메르세데스', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=331` },
      { group: 'wild-hunter', title: '와일드헌터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=341` },
      { group: 'night-lord', title: '나이트로드', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=411` },
      { group: 'shadower', title: '섀도어', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=412` },
      { group: 'duel-blader', title: '듀얼블레이더', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=413` },
      { group: 'night-walker', title: '나이트워커', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=421` },
      { group: 'phantom', title: '팬텀', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=431` },
      { group: 'xenon', title: '제논', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=811` },
      { group: 'viper', title: '바이퍼', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=511` },
      { group: 'captain', title: '캡틴', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=512` },
      { group: 'canon-shooter', title: '캐논슈터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=513` },
      { group: 'striker', title: '스트라이커', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=521` },
      { group: 'eunwol', title: '은월', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=531` },
      { group: 'mechanic', title: '메카닉', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=541` },
      { group: 'angelic-buster', title: '엔젤릭버스터', url: `${INSOYA_HOST}zboard.php?id=talkmaple_job&divpage=9&category=551` },
    ],
  },
  {
    icon: 'globe', title: '인소야 포럼', component: Post,
    menus: [
      { group: 'art', title: '아트 센터', url: `${INSOYA_HOST}zboard.php?id=forum_art&divpage=1` },
      { group: 'free', title: '자유 토크', url: `${INSOYA_HOST}zboard.php?id=talkfree&divpage=8` },
      { group: 'humor', title: '유머', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=5&divpage=8` },
      { group: 'game', title: '게임', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=4&divpage=8` },
      { group: 'computer', title: '컴퓨터/휴대폰', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=2&divpage=8` },
      { group: 'animation', title: '애니메이션', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=3&divpage=8` },
    ],
  },
  { icon: 'user', title: '정보', component: Info },
];

export default MENUS;