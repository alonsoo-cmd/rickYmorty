import { type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx",[
        index("routes/characters-list.tsx"),
        route("favourites", "routes/favourites.tsx"),
    ]),
] satisfies RouteConfig;
