import { INSOYA_HOST } from '../config';
import Post from '../containers/Post';
import Info from '../components/Info';

const MENUS = [
  {
    icon: 'bell', title: '메이플 정보', component: Post,
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
    icon: 'users', title: '인소야 포럼', component: Post,
    menus: [
      { group: 'art', title: '아트 센터', url: `${INSOYA_HOST}zboard.php?id=forum_art&divpage=1` },
      { group: 'free', title: '자유 토크', url: `${INSOYA_HOST}zboard.php?id=talkfree&divpage=8` },
      { group: 'humor', title: '유머', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=5&divpage=8` },
      { group: 'game', title: '게임', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=4&divpage=8` },
      { group: 'computer', title: '컴퓨터/휴대폰', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=2&divpage=8` },
      { group: 'animation', title: '애니메이션', url: `${INSOYA_HOST}zboard.php?id=talkfree&category=3&divpage=8` },
    ],
  },
  { icon: 'archive', title: '정보', component: Info },
];

export default MENUS;