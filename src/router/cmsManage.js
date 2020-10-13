import Layout from "@/layout";
import defaultLayout from "@/layout/defaultLayout";

export default [
  {
    path: "/cms",
    component: Layout,
    name: "cms",
    redirect: "/cms/contentManage",
    meta: {
      title: "CMS系统",
      icon: "nested",
    },
    children: [
      {
        path: "contentManage",
        component: defaultLayout,
        name: "contentManage",
        redirect: "/cms/contentManage/acquisition",
        alwaysShow: true,
        meta: {
          title: "内容管理",
        },
        children: [
          {
            path: "acquisition",
            component: () =>
              import("@/views/cmsManage/pages/contentManage/acquisition/index"),
            name: "acquisition",

            meta: {
              title: "内容采集",
            },
          },
          {
            path: "articleManage",
            component: () =>
              import(
                "@/views/cmsManage/pages/contentManage/articleManage/index"
              ),
            name: "articleManage",
            meta: {
              title: "文章管理",
            },
          },
        ],
      },
    ],
  },
];
