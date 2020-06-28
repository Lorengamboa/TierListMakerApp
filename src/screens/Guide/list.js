import routes from "@config/routes";


export default listGuide = t => [
  {
    name: t("instructions:browser:title"),
    avatar_url: require("../../assets/img/image.png"),
    subtitle: t("instructions:browser:description"),
    scene: routes.BROWSER_GUIDE
  },
  // {
  //   name: t("instructions:deleteImage:title"),
  //   avatar_url: require("../../assets/img/image.png"),
  //   subtitle: t("instructions:deleteImage:description"),
  //   scene: routes.DELETE_GUIDE
  // },
  // {
  //   name: t("instructions:share:title"),
  //   avatar_url: require("../../assets/img/image.png"),
  //   subtitle: t("instructions:share:description"),
  //   scene: routes.SHARE_GUIDE
  // }
];
