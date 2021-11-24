import Home from 'pages/Home';
import Works from 'pages/Works';
import Calendar from 'pages/Calendar';
import Timeline from 'pages/Timeline';
import Slack from 'pages/Slack';
import NotFound from 'pages/NotFound';

const Menus = [
  {
    path: [
      "/",
      "/home",
    ],
    slug: "home",
    label: "Home",
    navigation: false,
    authorization: false,
    component: Home,
  },
  {
    path: [
      "/works",
    ],
    slug: "works",
    label: "Works",
    navigation: true,
    authorization: false,
    component: Works,
  },
  {
    path: [
      "/calendar",
    ],
    slug: "calendar",
    label: "Calendar",
    navigation: true,
    authorization: false,
    component: Calendar,
  },
  {
    path: [
      "/timeline",
    ],
    slug: "timeline",
    label: "Timeline",
    navigation: true,
    authorization: false,
    component: Timeline,
  },
  {
    path: [
      "/slack",
    ],
    slug: "slack",
    label: "Slack",
    navigation: true,
    authorization: false,
    component: Slack,
  },
  {
    path: [
      "/notfound"
    ],
    slug: "notfound",
    label: "NotFound",
    navigation: false,
    authorization: false,
    component: NotFound,
  },
];
export default Menus;